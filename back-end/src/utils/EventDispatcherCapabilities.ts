const addEventDispatcherCapabilities = (objectToExtend: any) => {
    // Initialize event listener storage
    objectToExtend.__EventDispatcherExtender_aInputs = {};

    // Add event listener method
    objectToExtend.addEventListener = function (sEvent: any, fMethod: any) {
        if (!this.__EventDispatcherExtender_aInputs[sEvent]) {
            this.__EventDispatcherExtender_aInputs[sEvent] = [];
        }
        this.__EventDispatcherExtender_aInputs[sEvent].push(fMethod);
    };

    // Dispatch event method
    objectToExtend.dispatchEvent = function (sEvent: any) {
        const listeners = this.__EventDispatcherExtender_aInputs[sEvent];
        if (listeners) {
            const args = Array.prototype.slice.call(arguments, 1);
            listeners.forEach((fMethod: any) => fMethod.apply(this, args));
        }
    };

    return objectToExtend;
}
export default addEventDispatcherCapabilities;
