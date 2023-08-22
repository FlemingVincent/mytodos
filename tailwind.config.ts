/** @type {import('tailwindcss').Config} */
const { plugin } = require("twrnc");
module.exports = {
	content: [],
	theme: {
		extend: {},
		fontFamily: {
			openrunde: ["OpenRunde-Regular"],
			"openrunde-medium": ["OpenRunde-Medium"],
			"openrunde-semibold": ["OpenRunde-Semibold"],
			"openrunde-bold": ["OpenRunde-Bold"],
		},
	},
	plugins: [
		// @ts-ignore
		plugin(({ addUtilities }) =>
			addUtilities({
				"large-title": `text-[2.125rem] tracking-[-0.025rem] font-openrunde`,
				"large-title-emphasized": `text-[2.125rem] tracking-[-0.025rem] font-openrunde-bold`,
				"title-one": `text-[1.75rem] tracking-[-0.025rem] font-openrunde`,
				"title-one-emphasized": `text-[1.75rem] tracking-[-0.025rem] font-openrunde-bold`,
				"title-two": `text-[1.375rem] tracking-[-0.025rem] font-openrunde`,
				"title-two-emphasized": `text-[1.375rem] tracking-[-0.025rem] font-openrunde-bold`,
				"title-three": `text-[1.25rem] tracking-[-0.025rem] font-openrunde`,
				"title-three-emphasized": `text-[1.25rem] tracking-[-0.025rem] font-openrunde-semibold`,
				headline: `text-[1.0625rem] tracking-[-0.025rem] font-openrunde-semibold`,
				body: `text-[1.0625rem] tracking-[-0.025rem] font-openrunde`,
				"body-emphasized": `text-[1.0625rem] tracking-[-0.025rem] font-openrunde-semibold`,
				callout: `text-[1rem] tracking-[-0.025rem]`,
				"callout-emphasized": `text-[1rem] tracking-[-0.025rem] font-openrunde-semibold`,
				subheadline: `text-[0.9375rem] tracking-[-0.025rem]`,
				"subheadline-emphasized": `text-[0.9375rem] tracking-[-0.025rem] font-openrunde-semibold`,
				footnote: `text-[0.8125rem] tracking-[-0.025rem]`,
				"footnote-emphasized": `text-[0.8125rem] tracking-[-0.025rem] font-openrunde-semibold`,
				"caption-one": `text-[0.75rem] tracking-[-0.025rem]`,
				"caption-one-emphasized": `text-[0.75rem] tracking-[-0.025rem] font-openrunde-medium`,
				"caption-two": `text-[0.6875rem] tracking-[-0.025rem]`,
				"caption-two-emphasized": `text-[0.6875rem] tracking-[-0.025rem] font-openrunde-medium`,
			}),
		),
	],
};
