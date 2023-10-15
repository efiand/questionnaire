import type { FormSet } from "@/lib/types";

export const formSets: FormSet[] = [
	{
		nearest: true,
		heading: "Паспортные данные",
		hideHeading: true,
		fields: [
			{
				label: "Полное ФИО",
				type: "text ",
				name: "name",
				value: "Ефимов Андрей Николаевич",
				placeholder: "Иванов Иван Иванович",
				required: true,
			},
			{
				label: "Год рождения",
				type: "number",
				name: "birthdate",
				value: "1984",
				placeholder: "1990",
			},
			{
				label: "Место жительства",
				type: "text",
				name: "location",
				value: "г. Санкт-Петербург, Россия",
				placeholder: "г. Иваново, Россия",
				required: true,
			},
		],
	},
	{
		heading: "Контакты",
		hideHeading: true,
		fields: [
			{
				label: "Скайп",
				type: "text",
				name: "skype",
				value: "efiand",
				placeholder: "ivanov",
			},
			{
				label: "Почта",
				type: "email",
				name: "mail",
				value: "efiand@ya.ru",
				placeholder: "ivanov@gmail.com",
				required: true,
			},
		],
	},
	{
		heading: "Расскажите о себе чекбоксами",
		description:
			"Отметьте чекбоксами пункты, которые соответствуют вашим скиллам. Кстати, отсутствие опыта не означает, что у вас меньше шансов стать одним из наших товарищей. Это означает, что вы будете получать те задачи, с которыми гарантировано будете справляться.",
		checkers: {
			modelValue: [
				"bem",
				"pug",
				"css-preprocessor",
				"svg",
				"semantic",
				"a11y",
				"es6",
				"task-runners",
				"webpack",
				"webgl",
				"jquery",
				"node",
				"git",
				"eye-estimation",
			],
			items: [
				{
					label: "БЭМ/OOCSS",
					type: "checkbox",
					name: "properties",
					value: "bem",
				},
				{
					label: "Pug (Jade)",
					type: "checkbox",
					name: "properties",
					value: "pug",
				},
				{
					label: "Stylus/LESS/SASS",
					type: "checkbox",
					name: "properties",
					value: "css-preprocessor",
				},
				{
					label: "Работаю с SVG",
					type: "checkbox",
					name: "properties",
					value: "svg",
				},
				{
					label: "Верстаю семантично",
					type: "checkbox",
					name: "properties",
					value: "semantic",
				},
				{
					label: "Accessibility (A11Y)",
					type: "checkbox",
					name: "properties",
					value: "a11y",
				},
				{
					label: "ES2015/ES2016",
					type: "checkbox",
					name: "properties",
					value: "es6",
				},
				{
					label: "Gulp/GRUNT",
					type: "checkbox",
					name: "properties",
					value: "task-runners",
				},
				{
					label: "Webpack",
					type: "checkbox",
					name: "properties",
					value: "webpack",
				},
				{
					label: "Дружу с WebGL",
					type: "checkbox",
					name: "properties",
					value: "webgl",
				},
				{
					label: "jQuery",
					type: "checkbox",
					name: "properties",
					value: "jquery",
				},
				{
					label: "Знаю/изучаю Angular",
					type: "checkbox",
					name: "properties",
					value: "angular",
				},
				{
					label: "Знаю/изучаю React",
					type: "checkbox",
					name: "properties",
					value: "react",
				},
				{
					label: "Знаю/изучаю Node.js",
					type: "checkbox",
					name: "properties",
					value: "node",
				},
				{
					label: "Использую Git",
					type: "checkbox",
					name: "properties",
					value: "git",
				},
				{
					label: "С глазомером всё ок",
					type: "checkbox",
					name: "properties",
					value: "eye-estimation",
				},
				{
					label: "Я ленивый(-ая)",
					type: "checkbox",
					name: "properties",
					value: "lasy",
				},
				{
					label: "У меня хороший английский",
					type: "checkbox",
					name: "properties",
					value: "english",
				},
			],
		},
	},
	{
		heading: "Уровень владения JavaScript",
		ranger: {
			name: "js",
			label: "Шкала уровня владения в процентах",
			value: 85,
			levels: [
				{
					title: "Не владею",
					width: "20%",
				},
				{
					title: "Использую готовые решения",
					width: "30%",
				},
				{
					title: "Использую готовые решения и умею их переделывать",
					width: "30%",
				},
				{
					title: "Пишу сложный JS с нуля",
					width: "20%",
				},
			],
		},
	},
	{
		heading: "Расскажите о себе словами",
		description:
			"Напишите пару предложений, чем вас привлекла наша вакансия и чего вы ожидаете от работы. Кстати, будет здорово, если при нехватке места для текста строки будут добавляться автоматически.",
		fields: [
			{
				label: "Текст сообщения",
				hideLabel: true,
				textarea: true,
				name: "message",
				value:
					"Люблю работать с хорошими практиками (семантика, a11y, БЭМ). Отличаюсь организованностью, стремлением к качеству. Опыт работы с Vue.js (Nuxt.js).",
				placeholder: "Ну-ууу-уу... Ээээ...",
			},
		],
	},
	{
		heading: "Какие у вас планы на будущее?",
		description:
			"Этот ответ ни на что не повлияет. Не беда, если в будущем ваши планы поменяются.",
		checkers: {
			modelValue: "js",
			items: [
				{
					label: "Верстать",
					type: "radio",
					name: "plans",
					value: "layout",
				},
				{
					label: "Прокачиваться в JS",
					type: "radio",
					name: "plans",
					value: "js",
				},
				{
					label: "Менеджерство",
					type: "radio",
					name: "plans",
					value: "management",
				},
				{
					label: "Другое",
					type: "radio",
					name: "plans",
					value: "other",
				},
			],
		},
	},
	{
		heading: "Дополнительно",
		hideHeading: true,
		fields: [
			{
				label: "Дата заполнения",
				date: true,
				name: "date",
				value: "24.05.2019",
				placeholder: "01.01.2016",
			},
		],
	},
];
