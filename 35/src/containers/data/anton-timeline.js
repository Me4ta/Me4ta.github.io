// r stands for "record", short name to make items readable in array
const r = (date, country, city, title, description) => ({
	date,
	location: { country, city },
	title,
	description
})

export default [
	r('1982', 'Казахстан', 'Семипалатинск', 'Родилась', 'весом в хз гр'),
	r('1982', 'Казахстан', 'Семипалатинск', 'Живет в Общежитии с друзьями', 'родители вынуждены учиться и работать'),
	r('1982', 'Казахстан', 'Семипалатинск', 'Живет в Общежитии с друзьями', 'родители вынуждены учиться и работать'),
	r('1983', 'Казахстан', 'Семипалатинск', 'Первый Шрам', 'упала на обогреватель "Тарелка" под папиным присмотром'),
	r('1984', 'Казахстан', 'Семипалатинск', '1984 Первый Шрам', 'упала на обогреватель "Тарелка" под папиным присмотром'),
	r('1985', 'Казахстан', 'Семипалатинск', 'Переезд в Гурьев', ''),
	r('1986', 'Казахстан', 'Гурьев', 'Водит Сестру в Садик', 'приходится стать изобретательной в уговорах, т.к. сестра в садик ходить не хочет'),
]
