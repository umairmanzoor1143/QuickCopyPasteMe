const { verify } = require("../conrollers/userController")
// const axios = require("axios")
// const fs = require("fs")
// const path = require("path")
// const jsonwebtoken = require("jsonwebtoken")
const router = require("express").Router()
// const privateKeyPath = path.join(__dirname, "..", "private.pem")
// const privateKey = `-----BEGIN RSA PRIVATE KEY-----
// MIIEowIBAAKCAQEAtisTG6PIrZ+GhJghXVjERj4qu1WJBFVY8TeuWV++Ok+yZ+9Y
// YKrfHITAu5hso2wVCmxxkb2TFMZvz8igoBnel3wUsi53OPTE8dzX6+TU2IxLgI/k
// lxDFnd/P8GdnxyP9GlhNy8kxPltkFozP15g5TOnNn2y9s48MoPX1N/7HR5vmYfnG
// SlIvB91QI6c7yrLvbSOX8s3SBQdFkRzgYSZ1Piia4CVZiWx9Iz+sudznS3dEmY0n
// 4kRjoTIEOoUx0Xk15dBok1GxrY7HR7X8wIwkDHHWfu7i4i4EoqdnOxYU7GVRH0PA
// x8FaGRTdvwUnNuE3aR0PUuALaTRf5qASp3jnWQIDAQABAoIBACkwQBfFxoALS7z7
// MMAMbAR91eeZhWtnaL7Rmig3D6nbjzkU0uS4fc3S7kj8Q8QHkhJTRrJvLKxL2cgf
// UsIgV0XlFkDbZLWKEmWlS2TYzo9P2VpuLn9BmY0Cp99xYfOS3Y1xXdWv3eR9gXnf
// yLa0gnAzhPyA97t7op1aP2Gzx5cW9QhIi/0xBLDBr27Cd4fK+nx/Ekk46pFMd6PI
// rGrVZJf6vAHizTQZXEiz4KKSkIQcNXh3StzvxfP6v4CN3hwYFYBVLt0roBCvPNRg
// MQh1TE6sM0wOj43b9j+/LF6bT2WigI0m1qTrE1r+bjSTb1jEIChY7goqsj85gRyx
// x22ZyOkCgYEA5DkQNjyo/Rcn0MXA8KB5PC22J9ycuOimjQUr7fNRA1bBNHVy7jGP
// lv0lL0DtQxiT96Tt0Jjky0meNLUAMKH5d7TJDZZ1IMVq5MjSWm3gbOj7I5Ueh7NQ
// 2kyVbyEqSnTkvF0kgcQFTyL/ad6fEIULnlVtUSSaebhMGz/Z+jOgVEcCgYEAzFcM
// HE6Igqix5popN4jbKNbYMRefSjTSumh8HwuAHCfAnXLErcWyHccDEy5Q/eK2oaHb
// GA0r/iNkEWQMivtbFvMq9VzOPWwknmYzdfI6k7j/mMCqC0pOmX8ynot3YhoKEANn
// A+8Tsq2heTb+ZdELYV63RMdTsadOVKVXfZk+118CgYBJ5+zHE5fJ9gCvzApyIhWA
// lnEBsaCTBMxCqKUUNpJKmYKRoWMpnaUZSTsMdWMgMkpgjOlyfsDA0ENKYD8CgMGP
// sVzWaJ3fke7OzfXI0QI3Yq9JU5YCbeBGATz3Mu9GE1qrYSJcX4U0nmnF+BDcwakE
// ijePamIX/sWuoVvOeX93KwKBgAWLLwbtkoKI9RqegBPDoL6A5aifTXED8dugzg1B
// kJ4y7eTXokJcpLJuHcU9cnEQ34ePDpSedt0UNLjMEBMNMrFys22osOe1sWCiwS6n
// /bLYSAbq4zIfN/auHr9yZTDCKBe7H+ZZbB1i3IifV1OH0lk36pzxE3I0acmeGruL
// lsrdAoGBAKZDNDN6gkYkAfOoNMnzjib0wZb9mQSu36kQjNTaaJI7g1/zcb70EqdJ
// gCb4rYZvTwmij6o3Hy4NAoc1+k+yplLChwilWwZfaNU1oMe8Zg6c48gCYZVaDCyE
// boo7afoBtq3Qmp4tpf8XKTx/zQ9PxcljPjv3BVfFvwhDLMgyPKcH
// -----END RSA PRIVATE KEY-----
// `

// const generateJwt = () => {
//   try {
//     // const privateKey = fs.readFileSync(privateKeyPath, "utf8")
//     const token = jsonwebtoken.sign(
//       {
//         iat: Math.floor(Date.now() / 1000),
//         exp: Math.floor(Date.now() / 1000) + 3600, // Token valid for 1 hour
//       },
//       privateKey,
//       {
//         algorithm: "RS256",
//         keyid: "kid-test-g9492f1d",
//       }
//     )

//     return token
//   } catch (err) {
//     console.error("Error reading private key:", err.message)
//     throw err // Re-throw the error to handle it further up the call stack or log it appropriately
//   }
// }

// const getApiResults = async (req, res) => {
//   const jwt = await generateJwt()
//   console.log({ jwt })
//   try {
//     const response = await axios.post(
//       "https://52.76.54.128/api",
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${jwt}`,
//         },
//         // timeout: 100000, // Timeout set to 10 seconds
//       }
//     )
//     res.send({ data: response.data })
//   } catch (err) {
//     console.error("API call failed:", err.message)
//     res
//       .status(500)
//       .send({ error: "Failed to fetch data", details: err.message })
//   }
// }
// /users/register
router.post("/login", verify)
// router.get("/auth", getApiResults)
module.exports = router
