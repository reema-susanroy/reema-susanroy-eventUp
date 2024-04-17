export const FormatTime = (time) => {
    const timeFormatted = new Date(time)
    console.log(timeFormatted);

    const hours= timeFormatted.getHours();
    const minutes = timeFormatted.getMinutes();

    return (`${hours} : ${minutes}`);
}