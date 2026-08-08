export type ClaimRow = {
  feature: string;
  practice: string;
  positiveTitle: string;
  positiveText: string;
  negativeTitle: string;
  negativeText: string;
};

export const claimsRows: ClaimRow[] = [
  {
    feature: "Gap Finder",
    practice: "Maya attempts \u201cmental maths\u201d (travel + activity + shower time), experiences cognitive overload, and abandons the task (\u201cLogistics Paralysis\u201d).",
    positiveTitle: "Cognitive Offloading",
    positiveText: "Automating the scheduling logistics removes the mental barrier to entry, increasing the likelihood of using short breaks.",
    negativeTitle: "Privacy Trade-off",
    negativeText: "Requires deep access to calendar. While 71% consented, 29% may reject this due to privacy concerns, rendering the feature unusable for them.",
  },
  {
    feature: "Visual Proof",
    practice: "Liam approaches a location, imagines or sees a crowd, feels \u201cFear of Judgement,\u201d and retreats to his dorm.",
    positiveTitle: "Psychological Safety",
    positiveText: "Provides transparent, real-time evidence of the environment. Removes ambiguity, allowing the user to verify safety (quietness) before committing effort.",
    negativeTitle: "Data & Privacy Cost",
    negativeText: "Video streaming consumes user mobile data. Blurring algorithms must be perfect to protect the privacy of bystanders captured in the footage.",
  },
  {
    feature: "Crowd Filter",
    practice: "Users struggle to find specific \u201csafe\u201d spaces, manually checking multiple locations or avoiding exercise entirely due to uncertainty.",
    positiveTitle: "User Agency (Hick\u2019s Law)",
    positiveText: "Lets the user filter the environment to their comfort level immediately. Validates their need for privacy rather than forcing exposure.",
    negativeTitle: "Echo Chamber Risk",
    negativeText: "May facilitate \u201cSafety Behaviours\u201d (a CBT concept) where the user avoids anxiety triggers permanently rather than gradually overcoming the fear of crowds.",
  },
];
