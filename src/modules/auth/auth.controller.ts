import { RequestHandler } from "express";
import AuthService from "../user/user.service";
import { LoginDto, UserDto } from "./auth.dto";
import bcrypt from "bcrypt";
import { sign } from "../../core/service/jwt/jwt.service";
import { Userbody } from "../user/user.dto";
import { generateCode, getTimeOut } from "@/core/utils/generateCode";
import { sendMail } from "@/core/service/mail.service";
import VerificationService from "./auth.service";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const login: LoginDto = req.body;

    const user = await AuthService.findUser(login.username);

    if (!user) {
      return res.status(404).json({
        message: `${login.username} bo'yicha foydalanuvchi ma'lumotlari topilmadi`,
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

    const payload = UserDto(user);
    const token = await sign(payload);

    // return res.status(200).json({
    //   message: "Muvaffaqiyatli kirdingiz",
    //   token,
    // });

    return res.send(token);
  } catch (error) {
    next();
  }
};

export const register: RequestHandler = async (req, res, next) => {
  try {
    const data: Userbody = req.body;

    const isExcist: boolean = await AuthService.excisUser(data.email);

    if (isExcist) {
      return res.status(403).json({
        message: "Email avval ro'yhatdan o'tgan",
      });
    }

    const newUser = await AuthService.create(data);

    const code: string = generateCode();

    await sendMail(newUser.email, code);

    const verification = await VerificationService.createVerification(
      code,
      newUser.email
    );

    if (verification == null) {
      return res.status(400).json({
        message: "Can't save verification",
      });
    }

    const deleteCount = await VerificationService.cleanVerification(
      +process.env.VERIFICATION_TIMEOUT!
    );
    console.log("Verikatsiya o'chirildi", deleteCount);

    return res.status(200).json({
      message: "Verifikatsiya kodi pochtangizga jo'natildi",
      email: newUser.email,
      verificationId: verification.id,
      timeOut: getTimeOut(
        verification.createdAt,
        +process.env.VERIFICATION_TIMEOUT!
      ),
    });
  } catch (err) {
    next(err);
  }
};
