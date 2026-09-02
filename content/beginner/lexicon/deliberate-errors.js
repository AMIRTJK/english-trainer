/**
 * Forms that are wrong on purpose.
 *
 * English File itself teaches with negative examples ("NOT I didn't arrived"),
 * so a good distractor is often an incorrect form of a correct word. Listing
 * them here keeps that intentional and reviewable: `validate-content.ts`
 * asserts that none of these ever appears in a correct answer.
 */
export const deliberateErrors = `
childes childs classies classs countryes countrys dictionaryes dictionarys
keies keyes mans mens womans womens peoples persons
watchs finishs studys gos dos haves
olds
cryed studyed travelet travelt stoped likeed likd raind rainned arriveed
finishd finishied cryd crys
getted gotted goed gone doed telled sended writed written seed seen sitted
sayed buyed boughted leaved haved
cycleing swiming shoping driveing flyes
egyptish japanish spainish turkeyan threeth twelveth twelvth stopd studyd hadn't thirtyth
`;
