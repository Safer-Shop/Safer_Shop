import dotenv from 'dotenv'
import { addAliases } from 'module-alias'

addAliases({
	'@config': `${__dirname}/config`,
	'@controller': `${__dirname}/controller`,
	'@middleware': `${__dirname}/middleware`,
	'@model': `${__dirname}/model`,
	'@routes': `${__dirname}/routes`,
	'@service': `${__dirname}/service`,
})

dotenv.config()
