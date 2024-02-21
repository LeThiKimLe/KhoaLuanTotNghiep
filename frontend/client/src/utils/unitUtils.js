import { parse, format } from 'date-fns';

export const convertToTime = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export const convertToStamp = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    if (minutes !== 0 && hours !== 0)
        return `${hours} tiếng ${minutes} phút`;
    else if (minutes === 0 && hours !== 0)
        return `${hours} tiếng`
    else return `${minutes} phút`
}

export const calculateTimeInDay = (baseTime, additionalHours) => {
    const totalHours = baseTime + additionalHours;
    const result = totalHours % 24;
    const timeInDay = result < 0 ? result + 24 : result;
    return convertToTime(timeInDay);
  }

export const addHoursToTime = (timeString, hours) => {
    var parts = timeString.split(':');
    var hour = parseInt(parts[0]);
    var minute = parseInt(parts[1]);
    var date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    var minutesToAdd = Math.floor(hours * 60); // Chuyển đổi số lẻ giờ thành phút
    date.setMinutes(date.getMinutes() + minutesToAdd);
    var newHour = date.getHours().toString().padStart(2, '0');
    var newMinute = date.getMinutes().toString().padStart(2, '0');
    return newHour + ':' + newMinute;
  }

export const subtractHoursFromTime = (timeString, hours) => {
    var parts = timeString.split(':');
    var hour = parseInt(parts[0]);
    var minute = parseInt(parts[1]);
    var date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    var minutesToSubtract = Math.floor(hours * 60); // Chuyển đổi số lẻ giờ thành phút
    date.setMinutes(date.getMinutes() - minutesToSubtract);
    var newHour = date.getHours().toString().padStart(2, '0');
    var newMinute = date.getMinutes().toString().padStart(2, '0');
    return newHour + ':' + newMinute;
} 

export const convertToDisplayDate = (dataDate) => {
    return format(parse(dataDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')
}

export const convertToDataDate = (displayDate) => {
    return format(parse(displayDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
}

export const convertTimeToInt = (dataTime) => {
    const timeParts = dataTime.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const decimalTime = hours + minutes / 60;
    return decimalTime
  }

export const addHourToDate = (date, decimalHours) => {
    var newDate = new Date(date);
    // get hours and mins from decimalHours
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    newDate.setHours(newDate.getHours() + hours, newDate.getMinutes() + minutes);
    return newDate;
}