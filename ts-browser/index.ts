declare const logs: {
    info(messages: any|any[]): void;
    error(messages: any|any[]): void;
};
logs.info("Typescript running under the browser");
