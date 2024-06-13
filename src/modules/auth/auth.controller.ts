import { RequestHandler } from "express";
import { LoginDto, UserDto, VerificationDto, resendDto } from "./auth.dto";
import bcrypt from "bcrypt";
import { sign } from "../../core/service/jwt/local-jwt.service";
import { Userbody } from "../user/user.dto";
import { generateCode, getTimeOut } from "../../core/utils/generateCode";
import { sendMail } from "@/core/service/mail.service";
import AuthService from "./auth.service";
import { Payload } from "./auth.dto";
import { verificationConfig as config } from "@config";
import UserService from "../user/user.service";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const data: Userbody = req.body;

    const isExcist: boolean = await UserService.excisUser(data.email);

    if (isExcist) {
      return res.status(403).json({
        message: "Email avval ro'yhatdan o'tgan",
      });
    }

    const newUser = await UserService.create(data);

    const code: string = generateCode();

    await sendMail(newUser.email, code);

    const verification = await AuthService.createVerification(
      code,
      newUser.email
    );

    if (verification == null) {
      return res.status(400).json({
        message: "Can't save verification",
      });
    }

    const deleteCount = await AuthService.cleanVerification(
      +process.env.VERIFICATION_TIMEOUT!
    );
    console.log("Verikatsiya o'chirildi", deleteCount);

    return res.status(200).json({
      message: "Verifikatsiya kodi pochtangizga jo'natildi",
      email: newUser.email,
      verificationId: verification.id,
      timeOut: getTimeOut(verification.createdAt, config.VERIFICATION_TIMEOUT),
    });
  } catch (err) {
    next(err);
  }
};

export const verify: RequestHandler = async (req, res, next) => {
  try {
    const verify: VerificationDto = req.body;

    const verified = await AuthService.findVerificationById(
      verify.verificationId
    );

    if (verified == null) {
      return res.status(404).json({
        message: `Verifikatsiya id: ${verify.verificationId} topilmadi`,
      });
    }

    const timeOut = getTimeOut(verified.createdAt, config.VERIFICATION_TIMEOUT);

    if (timeOut < 0) {
      return res.status(400).json({
        message:
          "Verifikatsiya kod muddati tugagan, iltimos qaytadan kod jo'nating",
      });
    }

    if (verified.code != verify.code) {
      return res.status(400).json({
        message: "Verifikatsiya kodi xato",
      });
    }

    const user = await UserService.findByEmail(verified.email);

    if (user == null) {
      return res.status(404).json({
        message: `${user} foydalanuvchi topilmadi`,
      });
    }

    const payload: Payload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      phone: user.phone,
      email: user.email,
      address: user.address!,
      role: user.role,
      status: user.status,
      created: user.created,
      updated: user.updated,
    };

    const token = await sign(payload);

    const update = await UserService.changeUserRole(user.id, "user");

    return res.status(201).json({
      message: "Muvaffaqiyatli ro'yhatdan o'tdingiz",
      user: {
        id: update.id,
        name: update.name,
        surname: update.surname,
        username: update.username,
        phone: update.phone,
        email: update.email,
        address: update.address,
        role: update.role,
      },
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const login: LoginDto = req.body;

    const user = await UserService.findByEmail(login.email);

    if (!user) {
      return res.status(404).json({
        message: `${login.email} bo'yicha foydalanuvchi ma'lumotlari topilmadi`,
      });
    }

    if (user.role == "none") {
      return res.status(400).json({
        message: `hisob tasdiqlanmagan, iltimos hisobni tasdiqlang`,
      });
    }

    const isPasswordPalid = bcrypt.compareSync(login.password, user.password);

    if (!isPasswordPalid) {
      return res.status(401).json({
        message: "Parol yaroqsiz",
      });
    }

    const payload: Payload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      phone: user.phone,
      email: user.email,
      address: user.address!,
      role: user.role,
      status: user.status,
      created: user.created,
      updated: user.updated,
    };

    const token = await sign(payload);

    return res.status(200).json({
      message: "Muvaffaqiyatli kirdingiz",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next();
  }
};

export const resend: RequestHandler = async (req, res, next) => {
  try {
    const resend: resendDto = req.body;

    const user = await UserService.findByEmail(resend.email);

    if (!user) {
      return res.status(404).json({
        message: "Foydalanuvchi topilmadi",
      });
    }

    const code: string = generateCode();

    const verification = await AuthService.createVerification(code, user.email);

    if (verification == null) {
      return res.status(400).json({
        message: "Tasdiqlashni saqlab bo'lmadi",
      });
    }

    await sendMail(user.email, code);

    return res.status(200).json({
      message: "Verification code sended to email",
      email: user.email,
      verificationId: verification.id,
      timeOut: getTimeOut(verification.createdAt, +process.env.VERIFICATION_TIMEOUT!),
    });


  } catch (error) {
    next(error);
  }
};
