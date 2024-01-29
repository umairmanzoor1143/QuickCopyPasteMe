import EventDispatcherExtender from "./EventDispatcherCapabilities";
import createToken  from "./Token";

const createTokenManager = (aSockets: any) => {
  let _aTokens: any = {};

  const _findExpiredTokens = () => {
    for (let sKey in _aTokens) {
      let token = _aTokens?.[sKey];
      if (!token.isValid()) {
        delete _aTokens[sKey];
      }
    }
  };

  const TOKEN_EXPIRED = "token_expired";

  // Initialize token manager
   EventDispatcherExtender(this);
  const _timer = setInterval(_findExpiredTokens, 1000);

  return {
    createToken: (pair: any, sTokenType: any) => {
      let token = createToken(pair, sTokenType);
      let bCreated = false;

      while (!bCreated) {
        if (!_aTokens[token.getValue()]) {
          _aTokens[token.getValue()] = token;
          bCreated = true;
        } else {
          token = createToken(pair, sTokenType);
        }
      }
      return token;
    },

    getToken: (sTokenValue: any) => {
      if (!_aTokens[sTokenValue]) return false;

      let token = _aTokens[sTokenValue];
      delete _aTokens[sTokenValue];

      if (!token.isValid()) return false;

      return token;
    },

    TOKEN_EXPIRED: TOKEN_EXPIRED,
  };
};

export { createTokenManager };
