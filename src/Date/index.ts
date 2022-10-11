class FormatTime {
    now: any;
    constructor(...rest: any) {
        this.now = new Date(+new Date(rest) + 8*3600*1000);
    }
    format() {
        return this?.now?.toISOString?.()?.replace?.(/(\w+)\-(\w+)\-(\w+)T(\w+)\:(\w+)\:(\w+)\.(\w+)/, '$1年$2月$3日$4时$5分$6秒') ?? this?.now ?? 'Invalid Date';
    }
}

export {
    FormatTime,
}