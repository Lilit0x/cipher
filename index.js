const crypto = require('crypto')
const PASSWORD = 'key for encryption'
let salt, iv

const encrypt = (text) => {
	const algo = 'aes-192-cbc'
	salt = crypto.randomBytes(16)
	const key = crypto.scryptSync(PASSWORD, salt, 24)
	iv = crypto.randomBytes(16)

	const cipher = crypto.createCipheriv(algo, key, iv)
	let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")

	iv = iv.toString("hex")
	salt = salt.toString("hex")

	return encrypted
}

const decrypt = code => {
	const algo = 'aes-192-cbc'
	const key = crypto.scryptSync(PASSWORD, Buffer.from(salt, 'hex'), 24)

	const decipher = crypto.createDecipheriv(algo, key, Buffer.from(iv, 'hex'))
	let decrypted = decipher.update(code, "hex", "utf8")
	decrypted += decipher.final("utf8")

    return decrypted.toString()
}

//Test
const secret = encrypt("i am getting into web3bridge")
console.log(secret)
console.log(decrypt(secret))