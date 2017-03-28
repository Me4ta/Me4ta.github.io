const humanizeYears = years => {
  const endsWith = years % 10

	if (years < 1) {
		return 'несколько месяцев'
	}

	if (years >= 5 && years <= 20) {
		return `${years} лет`
	}

  if (endsWith === 1) {
    return `${years} год`
  } else if (endsWith === 2 || endsWith === 3 || endsWith === 4) {
    return `${years} года`
  } else if (endsWith === 5 || endsWith === 6 || endsWith === 7 || endsWith === 8 || endsWith === 9 || endsWith === 0) {
    return `${years} лет`
  }

	return 'error'
}

export {
	humanizeYears
}
