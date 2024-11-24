export const formattedDate = (daysFromToday) => {
	const targetDate = new Date();
	targetDate.setDate(targetDate.getDate() + daysFromToday);

	if (daysFromToday === 1) {
		return `Tomorrow, ${targetDate.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		})}`;
	}

	return targetDate.toLocaleDateString("en-GB", {
		weekday: "long",
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
};

export const getTimeUntilNextDay = () => {
	const now = new Date();
	const tomorrow = new Date();
	tomorrow.setDate(now.getDate() + 1);
	tomorrow.setHours(0, 0, 0, 0);
	const difference = tomorrow - now;
	const hours = Math.floor(difference / (1000 * 60 * 60));
	const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	return `If you order in the next ${hours} hours and ${minutes} minutes.`;
};
