export const BEGINNER_LEVEL_ID = 'beginner';
export const meta = {
    id: BEGINNER_LEVEL_ID,
    name: 'Beginner',
    order: 1,
    contentVersion: '1.0.0',
    book: "English File 4th edition Beginner (Student's Book & Workbook)",
};
const titles = [
    [1, 'A cappuccino, please / World music'],
    [2, 'Are you on holiday? / That’s my bus!'],
    [3, 'Where are my keys? / Souvenirs'],
    [4, 'Meet the family / The perfect car'],
    [5, 'A big breakfast? / A very long flight'],
    [6, 'A school reunion / Good morning, goodnight'],
    [7, 'Have a nice weekend! / Lights, camera, action!'],
    [8, 'Can I park here? / I ♥ cooking'],
    [9, 'Everything’s fine! / Working undercover'],
    [10, 'A room with a view / Where were you?'],
    [11, 'A new life in the USA / How was your day?'],
    [12, 'Strangers on a train / Revise the past'],
];
export const units = titles.map(([number, title]) => ({
    id: `beg-u${number}`,
    levelId: BEGINNER_LEVEL_ID,
    number,
    title,
}));
