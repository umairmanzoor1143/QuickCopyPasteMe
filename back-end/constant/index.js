const ConnectionEvents = {
  // setup manual connection
  REQUEST_MANUALCODE: "REQUEST_MANUALCODE",
  UPDATE_MANUALCODE: "UPDATE_MANUALCODE",
  REQUEST_SECONDARYDEVICE_CONNECT_BY_MANUALCODE:
    "REQUEST_SECONDARYDEVICE_CONNECT_BY_MANUALCODE",
  ERROR_SECONDARYDEVICE_CONNECT_BY_MANUALCODE_TOKEN_NOT_FOUND:
    "ERROR_SECONDARYDEVICE_CONNECT_BY_MANUALCODE_TOKEN_NOT_FOUND",
  UPDATE_SECONDARYDEVICE_MANUALCODE_ACCEPTED:
    "UPDATE_SECONDARYDEVICE_MANUALCODE_ACCEPTED",
  REQUEST_SECONDARYDEVICE_MANUALCODE_HANDSHAKE:
    "REQUEST_SECONDARYDEVICE_MANUALCODE_HANDSHAKE",
  REQUEST_MANUALCODE_CONFIRMATION: "REQUEST_MANUALCODE_CONFIRMATION",
  REQUEST__MANUALCODE_CONFIRMED: "REQUEST_SECONDARYDEVICE_MANUALCODE_CONFIRMED",
  UPDATE_SECONDARYDEVICE_CONNECTED_BY_MANUALCODE:
    "UPDATE_SECONDARYDEVICE_CONNECTED_BY_MANUALCODE",
  ERROR__CONNECT_BY_MANUALCODE_SECONDARYDEVICE_NOT_FOUND:
    "ERROR__CONNECT_BY_MANUALCODE_SECONDARYDEVICE_NOT_FOUND",

  // connection management for both devices
  REQUEST_DEVICE_RECONNECT: "REQUEST_DEVICE_RECONNECT",
  UPDATE_DEVICE_RECONNECTED: "UPDATE_DEVICE_RECONNECTED",
  ERROR_DEVICE_RECONNECT_DEVICEID_NOT_FOUND:
    "ERROR_DEVICE_RECONNECT_DEVICEID_NOT_FOUND",
  UPDATE_OTHERDEVICE_CONNECTED: "UPDATE_OTHERDEVICE_CONNECTED",
  UPDATE_OTHERDEVICE_DISCONNECTED: "UPDATE_OTHERDEVICE_DISCONNECTED",
  UPDATE_OTHERDEVICE_RECONNECTED: "UPDATE_OTHERDEVICE_RECONNECTED",

  // sharing
  REQUEST_TOGGLE_MANUALCONNECT: "REQUEST_TOGGLE_MANUALCONNECT",
  SEND_DATA: "SEND_DATA",
  RECEIVE_DATA: "RECEIVE_DATA",
  DATA_RECEIVED: "DATA_RECEIVED",

  // security
  REQUEST__FRESH_TOKEN: "REQUEST__FRESH_TOKEN",
  UPDATE__FRESH_TOKEN: "UPDATE__FRESH_TOKEN",
  ERROR_SECURITY_COMPROMISED: "ERROR_SECURITY_COMPROMISED",
  NOTIFICATION_SESSION_EXPIRED: "NOTIFICATION_SESSION_EXPIRED",

  // functionality
  REQUEST_TOGGLE_DIRECTION: "REQUEST_TOGGLE_DIRECTION",
  UPDATE_TOGGLE_DIRECTION: "UPDATE_TOGGLE_DIRECTION",
}
const TYPES = {
  TYPE_MANUALLY: "manually",
}
module.exports = { ConnectionEvents, TYPES }
