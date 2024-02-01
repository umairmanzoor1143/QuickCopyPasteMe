const generateUniqueId = require("generate-unique-id");
const generatePassword = require("generate-password");

const createToken = () => {
  const TOKEN_LIFETIME = 2 * 60 * 1000;
  let _sPairID = generateUniqueId({ length: 32 });
  let _sValue: string;
  let _nExpires: any;

  const initValueManualCode = () =>
    generatePassword.generate({
      length: 6,
      numbers: true,
      lowercase: false,
      uppercase: true,
      excludeSimilarCharacters: true,
      exclude: "i",
    });

  _sValue = initValueManualCode();
  _nExpires = new Date().getTime() + (!!_sValue !== false ? TOKEN_LIFETIME : 0);

  return {
    getValue: () => _sValue,
    getLifetime: () => TOKEN_LIFETIME,
    expires: () => _nExpires,
    pairId: () => _sPairID,
  };
};

export default createToken;
