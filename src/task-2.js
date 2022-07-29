class CarService {
  static DefaultWorkingHours = {
    from: '9:00',
    till: '20:00'
  };

  constructor(name, workingHours) {
    this.name = name;
    this.workingHours = workingHours || CarService.DefaultWorkingHours;
  }

  repairCar(carName) {
    let isCarNameExists = true;
    carName ?? (isCarNameExists &&= false);
    isCarNameExists &&= (carName !== '');
    if (!isCarNameExists) {
      console.error('Вам необходимо указать название машины, чтобы ее отремонтировать');
      return;
    }

    const todayTimeFrom = getFullTodayDateFromTimeString(this.workingHours.from);
    const todayTimeTill = getFullTodayDateFromTimeString(this.workingHours.till);
    const todayTimeNowMs = Date.now();

    if (todayTimeFrom.getTime() < todayTimeNowMs && todayTimeNowMs < todayTimeTill.getTime())
      alert(`Сейчас отремонтируем вашу машину ${carName}! Ожидайте пожалуйста.`);
    else
      alert('К сожалению, мы сейчас закрыты. Приходите в рабочее время.');
  }
}


/**
 * Convert time in formtat 'h:mm' to current today date with this time
 * @param {*} time Time in format 'h:mm', [string]
 * @returns Full Date object with today date and time from input value.
 * If input value has incorrect value, current date and time returned.
 * 
 */
function getFullTodayDateFromTimeString(time) {
  // parsing time from string 
  [hours, minutes] = time?.split(':');


  const date = new Date();

  // check input for correct format
  if (!isCorrectNumber(hours) || !isCorrectNumber(minutes)) {
    console.error(`\'${time}\' has wrong format not equal to \'h:mm\'!`);
    return date;
  }

  // construct result date
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

/**
 * Auxiliary function to check possibility of transform string value to number
 * @param {*} string String to check
 * @returns True if string could be converted to number. False otherwise.
 */
function isCorrectNumber(string) {
  let isCorrect = true;
  string ?? (isCorrect &&= false);

  let number = Number(string);
  isCorrect = !Number.isNaN(number);

  return isCorrect;
}


const carService = new CarService("RepairCarNow", {
  from: "8:00",
  till: "20:00"
});
carService.repairCar("BMW");
