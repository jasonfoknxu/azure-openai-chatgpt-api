/**
 * Logger to display message in console
 */
const log = (message: string | string[] | object, type: string = '') => {
  switch (type.trim()) {
    case 'i':
      type = 'INFO';
      break;
    case 'w':
      type = 'WARNING';
      break;
    case 'e':
      type = 'ERROR';
      break;
    case 'x':
      type = '!!!';
      break;
    case '':
      type = 'MESSAGE';
      break;
  }
  if (Array.isArray(message)) {
    console.log('[API] ' + time() + ' | <' + type + '> ' + message[0] + ' | ', message[1]);
  } else if (typeof message === 'object' && message !== null) {
    console.log('[API] ' + time() + ' | <' + type + '> ', message);
  } else {
    console.log('[API] ' + time() + ' | <' + type + '> ' + message);
  }
};

/**
 * Get current date time with format YYYY-MM-DD HH:mm:ss
 *
 * @returns The formatted datetime
 */
const time = (): string => {
  const d: Date = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
    2,
    '0'
  )} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(
    d.getSeconds()
  ).padStart(2, '0')}`;
};

export default log;
