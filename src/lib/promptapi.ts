type LanguageModel = unknown;

export async function createPromptSession(systemInstructions: string) {
  return await LanguageModel.create({
    initialPrompts: [
      {
        role: "system",
        content: systemInstructions,
      },
    ],
  });
}
