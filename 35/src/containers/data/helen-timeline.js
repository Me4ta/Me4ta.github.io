// r stands for "record", short name to make items readable in array
const r = (date, country, city, title, description) => ({
	date,
	location: { country, city },
	title,
	description
})

export default [
	r('1982, March 28', 'Казахстан', 'Семипалатинск', 'Родилась', 'первый ребёнок'),
	r('1982', 'Казахстан', 'Семипалатинск', 'Живет в Общежитии', 'родители вынуждены учиться и работать'),

	r('1983', 'Казахстан', 'Семипалатинск', 'Первый Шрам', 'упала с кровати на обогреватель "Тарелка" под папиным присмотром, шрам видно до сих пор'),
	r('1983', 'Казахстан', 'Семипалатинск', 'Родилась Ксюша', 'младшая сестра'),

	r('1985', 'Казахстан', 'Семипалатинск', 'Переезд в Гурьев', ''),

	r('1986', 'Казахстан', 'Гурьев', 'Водит Сестру в Садик', 'приходится стать изобретательной в уговорах, т.к. сестра в садик ходить не хотела и плакала'),
	r('1989', 'Казахстан', 'Алма-Ата', 'Гибнет Мама', 'погибла на автобусной остановке от столкновения с машиной неизвестного'),
	r('1989', 'Казахстан', 'Усть-Кменогорск', 'Возвращается из Гурьева в Усть-Каменогорск', 'в свои 6 лет успела повидать 4 города'),
	r('1989', 'Казахстан', 'Усть-Кменогорск', 'Идёт в 1й Класс', 'ну а чего ждать до 7ми?'),

	r('1990, November 01', 'Казахстан', 'Усть-Кменогорск', 'Знакомится с Новой Мамой', ''),
	r('1990, December', 'Казахстан', 'Усть-Кменогорск', 'Получила Снежком в Глаз', 'возвращалась из школы и мальчик, которому она нравилась попал ей прямо в глаз'),
	r('1990, December', 'Казахстан', 'Усть-Кменогорск', 'Пробила Мальчику Голову Карандашом', 'получилось случайно, но это тот же мальчик, что и со снежком, прилично надоел своими приставаниями'),

	r('1991, December 12', 'Казахстан', 'Усть-Кменогорск', 'Родился брат, Жека', 'жили в однокомнатной квартире, Жека много плакал. Был милый и пухленький мальчик.'),

	r('1992', 'Казахстан', 'Усть-Кменогорск', 'Разбивает Новую Люстру', 'прыгнув со стола, разбивает, только купленную, люстру головой'),

	r('1994', 'Казахстан', 'Усть-Кменогорск', 'Самостоятельно Поступает в Лицей', 'закончив 5й класс, узнаёт, что есть лицей, самостоятельно туда поступает. Приходит домой и сообщает родителям, что будет учиться в другой школе!'),
	r('1994', 'Казахстан', 'Усть-Кменогорск', 'Начинает Учиться Игре на Пианино', 'обучение осложняется тем, что приходится одновременно присматривать за братом'),

	r('1995, May', 'Казахстан', 'Усть-Кменогорск', 'Переезд в Калининград', ''),
	r('1995, August', 'Россия', 'Калининград', 'Переезд в Лиски', 'Воронежская область, 4й переезд на счету молодой Лены'),
	r('1995, August', 'Россия', 'Буйловка', 'Первый Поцелуй', 'у бабушки в деревне'),

	r('1996, August', 'Россия', 'Лиски', 'Новая Школа', 'снова самостоятельно (!) переходит в новую школу'),
	r('1996, August', 'Россия', 'Лиски', 'Кража Велосипеда', 'едет в магазин на велосипеде и оставляет его снаружи'),

	r('1999, May', 'Россия', 'Лиски', 'Выпускные Экзамены', 'на экзамене по математике применяет нестандартное решение задачи, которое вынуждает преподавателей совещаться о его правильности'),
	r('1999, July', 'Россия', 'Воронеж', 'Вступительные Экзамены', 'Устаёт настолько, что преподаватель выводит её, без сил, под руки из аудитории.'),
	r('1999, September', 'Россия', 'Воронеж', 'Начинает Встречаться с Геологом', 'первые серьёзные отношения'),
	// r('1999, September', 'Россия', 'Воронеж', 'Первый Интимный Опыт', 'серьёзные отношения же. Мама не разговаривала неделю, увидев в мед. карте, что Лена лешилась девственности.'),

	r('2000', 'Россия', 'Воронеж', 'Разошлась с Геологом', 'когда он уехал на 3 месяца, решила его не ждать'),
	r('2000 June', 'Россия', 'Воронеж', 'Первая Работа', 'работает промоутером, рекламировала пиво'),
	r('2000 June', 'Россия', 'Воронеж', 'Путешествие по Путёвке', 'была с подруой двумя последними людьми, кому досталась путёвка. Повстречалась с мальчиком в процессе.'),
	r('2000 July', 'Россия', 'Воронеж', 'Знакомится с Военным', 'провстречалась с ним 2 недели, но переписывалась почти год'),
	r('2000 August', 'Россия', 'Воронеж', 'Работает Кассиром в Казино', 'сначала ходила на курсы крупье, потом узнала, что это требует экзаменов, забила и пошла кассиром'),
	r('2000 September', 'Россия', 'Воронеж', 'Начинает Встречаться с Миллиционером', 'из милицейского института, самые яркие чувства до замужества. Отношения были сложными.'),

	r('2002 Май', 'Россия', 'Воронеж', 'Миллиционер Уходит', 'сильно страдает. Забивает на учёбу, 11 хвостов к концу 3го курса'),

	r('2003', 'Россия', 'Воронеж', 'Встречается с Парнем с Юридического', 'закончился 4й курс'),
	r('2003 June', 'Россия', 'Воронеж', 'Встречается с Качком', 'отфутболила его, потому что он был красивый, но глупый'),
	r('2003 July 03', 'Россия', 'Воронеж', 'Знакомится с Денисом', 'на следующий день после расставания с качком, на отмечании этого самого расставания с подругами. В казино, в котором ранее работала.'),
	r('2003 July 20', 'Россия', 'Воронеж', 'Едет с Денисом на Турбазу', 'завязываются основные отношения'),
	// r('2003 Nov 22', 'Россия', 'Воронеж', 'Выходит Замуж за Дениса', 'через 4 месяца после знакомства. Когда сообщила родилетям, что выходит замуж, мама сказала, что это неприлично.'),
	// r('2003 Nov 23', 'Россия', 'Воронеж', 'Венчается с Денисом', '...'),

	r('2004', 'Россия', 'Воронеж', 'Заканчивет Институт', '"слава богу", не могла дождаться пока уедет в Москву — лучши горд на свете'),
	r('2004', 'Россия', 'Москва', 'Приехала в Москву', 'Денис взял кредит и купил машину. Искала работу программистом, не пошла на копейки ($300), нашла работу в страховании, чтобы побыстрее отдать долги.'),

	r('2005', 'Россия', 'Москва', 'Живёт в Комнате со Свекровью', 'Если подумать – классическая ситуация, Москва, большие надежды, большие кредиты, маленькие комнаты'),

	r('2006', 'Россия', 'Москва', 'Переходит Работать в Росгосстрах', 'на большую должность и с повышением'),
	r('2006', 'Россия', 'Москва', 'Перетягивает Ксюшу в Москву', '"раз тебе нравится ногти красить, приезжай в Москву"'),

	r('2008', 'Россия', 'Москва', 'Переходит Работать в Агенство Недвижимости', 'руководителем группы телемаркетинга. В итоге её сократят.'),
	r('2008', 'Россия', 'Москва', 'Едет с Ксюхой в Тунис', 'первый раз за границей, всего на 5 дней, мини-отпуск'),
	r('2008', 'Россия', 'Москва', 'Едет с Денисом в Грецию', 'и ещё двумя друзьями, очень понравилось, были на острове. Обьехали его на квадрациклах.'),

	r('2009', 'Россия', 'Москва', 'Покупает 1к Квартиру', 'уговорили свекровь продать свою 2шку, взяли кредит и купили однушку'),
	r('2009', 'Россия', 'Москва', 'Появляется Валлик', 'берёт неделю отпуска, чтобы с ним быть'),

	r('2010 May', 'Россия', 'Москва', 'Устроилась Работать в АИЖК', 'нравится коллектив, зарабатывает много денег и очень много работает'),
	r('2010 May', 'Россия', 'Москва', 'Попадает в Аварию', '"да пиздец полный", понесло на обледенелой дороге, несколько раз ударило, в ограждения и другую машину. 1.5 года судилась с владельцем после. Не пострадала.'),

	r('2011', 'США', 'Сан-Франциско', 'Первый Раз в Америке', 'выбрали Сан-Франциско из-за Кремниевой Долины и мечты о стартапах со стороны Дениса.'),

	r('2012', 'США', 'Сан-Франциско', 'Разлаживаются Отношения с Денисом', 'ходит к психологу, чтобы им помочь'),
	r('2012 June', 'США', 'Сан-Франциско', 'Уезжает в США', 'Денис должен приехать позже'),
	r('2012 June', 'США', 'Сан-Франциско', 'Расстаётся с Денисом', 'решили разводиться'),
	r('2012 September', 'США', 'Сан-Франциско', 'Начинает Встречатся с Мишей', 'знакомство началось с мотоцикла, нравилось, что он много чем увлекался'),

	r('2013 May', 'США', 'Сан-Франциско', 'Расходится с Мишей и Знакомится с Антоном', 'это он'),
]
