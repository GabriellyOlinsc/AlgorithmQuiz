export function calculateScore (correctAnswers: number): number {
    const pointPerQuestion = 50;
    return correctAnswers * pointPerQuestion;
}