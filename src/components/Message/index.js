export default class Message {
    static config = {};
    static setConfig(config) {
        Message.config = config;
    }
    static error(msg) {
        Message.config.showError(msg);
    }
    static success(msg) {
        Message.config.showSuccess(msg);
    }
}
