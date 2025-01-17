export const parseDateToCustomFormat = (dateString) => {
    // Parsing input date string in MM-DD-YYYY HH:mm:ss format
    const [month, day, yearTime] = dateString.split("-");
    const [year, time] = yearTime.split(" ");
    const formattedDate = new Date(`${year}-${month}-${day}T${time}+07:00`); // Set timezone to GMT+0700

    return formattedDate;
};