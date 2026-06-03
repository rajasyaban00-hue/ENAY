const startDate = new Date("2023-09-20T14:00:00"); // YYYY-MM-DDTHH:MM:SS

    function updateTimeTogether() {
      const now = new Date();
      let diff = now - startDate;

      const msInSecond = 1000;
      const msInMinute = msInSecond * 60;
      const msInHour = msInMinute * 60;
      const msInDay = msInHour * 24;
      const msInMonth = msInDay * 30.44; // avg month
      const msInYear = msInDay * 365.25; // including leap year

      const years = Math.floor(diff / msInYear);
      diff %= msInYear;

      const months = Math.floor(diff / msInMonth);
      diff %= msInMonth;

      const days = Math.floor(diff / msInDay);
      diff %= msInDay;

      const hours = Math.floor(diff / msInHour);
      diff %= msInHour;

      const minutes = Math.floor(diff / msInMinute);
      diff %= msInMinute;

      const seconds = Math.floor(diff / msInSecond);

      document.getElementById("time-spent").textContent =
        `${years} year's, ${months} month's, ${days} day's, ` +
        `${hours} hour's, ${minutes} minute's, ${seconds} second's`;

    }

    updateTimeTogether();
    setInterval(updateTimeTogether, 1000);