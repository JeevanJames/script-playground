interface ILogs {
    info(messages: any|any[]): void;
    error(messages: any|any[]): void;
}
declare const logs: ILogs;

logs.info(`Testing`);
console.log('Jeevan');
alert('Blah');
