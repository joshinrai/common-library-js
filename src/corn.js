const setQuartzCron = (n: any) => {
  if (!n?.base) return '';

  const cron = ['0', '*', '*', '*', '*', '?'];
  if (n?.base >= 2) { // 时
    cron[1] = n?.minuteValues !== void 0 && n?.minuteValues?.length > 0 ? n?.minuteValues?.join?.(',') : '0';
  }

  if (n?.base >= 3) { // 天
    cron[2] = n?.hourValues !== void 0 && n?.hourValues?.length > 0 ? n?.hourValues?.join?.(',') : '*';
  }

  if (n?.base === 4) { // 周
    cron[3] = '?';
    cron[5] = n?.dayValues !== void 0 && n?.dayValues?.filter?.((r: any) => !isNaN(r))?.length > 0 ? n?.dayValues?.join?.(',') : '*';
  }

  if (n?.base >= 5) { // 月
    cron[3] = n?.dayOfMonthValues !== void 0 && n?.dayOfMonthValues?.filter?.((r: any) => !isNaN(r))?.length > 0 ? n?.dayOfMonthValues?.join?.(',') : '*';
  }
  return cron.join(' ');
};

const fromQuartzCron = (value: string, allowMultiple = true) => {
  if (!value) {
    return null;
  }
  const cron = value.replace(/\s+/g, ' ').split(' ');
  const frequency: any = { base: 1 }; // default: every minute
  let tempArray: any;
  if (cron.length !== 6) return console.error('错误');

  if (
    cron[1] === '*' &&
    cron[2] === '*' &&
    (cron[3] === '*' || cron[3] === '?') &&
    cron[4] === '*' &&
    (cron[5] === '*' || cron[5] === '?')
  ) {
    frequency.base = 1; // every minute
  } else if (cron[2] === '*' && (cron[3] === '*' || cron[3] === '?') && cron[4] === '*' && (cron[5] === '*' || cron[5] === '?')) {
    frequency.base = 2; // every hour
  } else if ((cron[3] === '*' || cron[3] === '?') && cron[4] === '*' && (cron[5] === '*' || cron[5] === '?')) {
    frequency.base = 3; // every day
  } else if (cron[3] === '*' || cron[3] === '?') {
    frequency.base = 4; // every week
  } else if (cron[4] === '*' && (cron[5] === '*' || cron[5] === '?')) {
    frequency.base = 5; // every month
  } else if (cron[5] === '*' || cron[5] === '?') {
    frequency.base = 6; // every year
  }
  const temp = ['minuteValues', 'hourValues', 'dayOfMonthValues', 'monthValues', 'dayValues'];
  try {
    temp.forEach((key: string, idx: number) => {
      if (cron[idx + 1] !== '*') {
        if (allowMultiple) {
          tempArray = cron[idx + 1].split(',').map((r) => Number(r));
          for (let i = 0; i < tempArray.length; i += 1) {
            const val = +tempArray[i];
            tempArray[i] = isNaN(val) ? void 0 : `${val}`.padStart(2, '0');
          }
          frequency[key] = tempArray.filter((j: any) => j !== void 0);
        } else {
          frequency[key] = parseInt(cron[idx + 1]);
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
  return frequency;
};
