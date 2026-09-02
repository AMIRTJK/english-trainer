import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getLevelIndex } from '@content/registry';
import { Pill } from '@/shared/ui/primitives';
import { OptionLabel } from '@/features/run-test/ui/QuestionView';
const REASON_LABEL = {
    new: 'New question',
    'previous-mistake': 'Previous mistake',
    'weak-topic': 'Weak topic',
    'recent-error': 'Recent error',
    'needs-review': 'Needs review',
    coverage: 'Checking coverage',
};
export function MistakeList({ attempt, titleOf, }) {
    const index = getLevelIndex(attempt.levelId);
    const mistakes = attempt.answers.filter((a) => !a.correct);
    return (_jsxs("section", { className: "card stack gap-16", children: [_jsxs("div", { className: "between", children: [_jsx("h2", { children: "Your mistakes" }), _jsx("span", { className: "small dim", children: mistakes.length })] }), mistakes.length === 0 ? (_jsx("p", { className: "small dim", children: "No mistakes in this test." })) : (_jsx("div", { className: "stack gap-16", children: mistakes.map((answer) => {
                    const question = index?.byId.get(answer.questionId);
                    return (_jsxs("article", { className: "stack gap-8", children: [_jsxs("div", { className: "row", style: { gap: 6 }, children: [_jsx(Pill, { children: titleOf(answer.topicId) }), _jsx(Pill, { tone: "accent", children: REASON_LABEL[answer.reason] })] }), _jsx("p", { style: { fontWeight: 550 }, children: question?.prompt ?? 'Question text not available' }), _jsxs("div", { className: "stack gap-8", style: { paddingLeft: 2 }, children: [_jsxs("div", { className: "row", style: { gap: 8 }, children: [_jsx("span", { className: "pill pill-bad", children: "Your answer" }), _jsx("span", { className: "small", children: answer.chosenText === null ? (_jsx("em", { className: "faint", children: "no answer" })) : question ? (_jsx(OptionLabel, { question: question, value: answer.chosenText })) : answer.chosenText })] }), _jsxs("div", { className: "row", style: { gap: 8 }, children: [_jsx("span", { className: "pill pill-good", children: "Correct" }), _jsx("span", { className: "small", children: question
                                                    ? _jsx(OptionLabel, { question: question, value: answer.correctText })
                                                    : answer.correctText })] })] }), question ? (_jsxs("p", { className: "small dim", style: { borderLeft: '2px solid var(--border)', paddingLeft: 10 }, children: [question.explanation, question.sound
                                        ? ` (${Object.entries(question.sound.ipa)
                                            .map(([word, ipa]) => `${word} ${ipa}`)
                                            .join(', ')})`
                                        : ''] })) : null, question ? (_jsxs("p", { className: "tiny faint", children: [question.source.book === 'SB' ? 'Student’s Book' : 'Workbook', ' ', "p.", question.source.page, " \u00B7 ", question.source.ref] })) : null] }, answer.questionId));
                }) }))] }));
}
