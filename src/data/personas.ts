export type Persona = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  bio: string;
  goals: string[];
  demographics: { icon: "age" | "gender" | "location" | "education" | "work"; label: string }[];
  frustrations: { label: string; text: string }[];
  coreNeeds: string;
  dataEvidence: string;
};

const IMG = "/assets/images/blog/building-move-app";

export const personas: Persona[] = [
  {
    name: "Liam",
    role: "The Anxious Beginner",
    avatar: `${IMG}/avatar-liam.png`,
    quote: "I don't know how to use the equipment and I'm too scared to ask. I prefer doing things on my own where no one is watching.",
    bio: "Liam is a sedentary student who knows exercise is important for his mental health but suffers from \u201cgymtimidation.\u201d He avoids the campus Sport Centre because he fears looking incompetent in front of the more experienced gym users. He often walks to the gym entrance, sees a crowd, and turns back home immediately.",
    goals: [
      "Find secluded spaces to exercise without an audience.",
      "Build confidence in low-pressure, non-competitive environments.",
      "Verify a location is quiet before leaving his room.",
    ],
    demographics: [
      { icon: "age", label: "19" },
      { icon: "gender", label: "Male" },
      { icon: "location", label: "Lives on Campus (Derwent College)" },
      { icon: "education", label: "Undergraduate Student" },
      { icon: "work", label: "Digital Native, Introverted" },
    ],
    frustrations: [
      { label: "Ambiguity", text: "Not knowing how busy a place is until he arrives." },
      { label: "Competition", text: "Hates leaderboards and being compared to others." },
      { label: "Judgement", text: "Feels self-conscious trying new equipment." },
    ],
    coreNeeds: "Needs reassurance that exercise spaces are quiet and non-judgemental. Visual Proof: needs to assess an environment before committing to go.",
    dataEvidence: "18% of users cited \u201cfeeling self-conscious\u201d as a primary barrier. 53% requested short video clips to judge the environment.",
  },
  {
    name: "Maya",
    role: "The Time-Constrained Planner",
    avatar: `${IMG}/avatar-maya.png`,
    quote: "I need things that are quick. I have a one-hour gap on Tuesdays and Thursdays\u2026 I need to find exercises that fit without needing to travel far.",
    bio: "Maya is a high-achieving student with a packed timetable. She suffers from \u201cLogistics Paralysis\u201d \u2013 the mental effort of calculating travel time, changeover time, and workout time prevents her from acting. She views fitness as a logistical problem to be solved, not a leisure activity.",
    goals: [
      "Utilise short 20\u201340 minute gaps between lectures.",
      "Remove the \u201cmental maths\u201d of planning.",
      "Maintain fitness without impacting study time.",
    ],
    demographics: [
      { icon: "age", label: "22" },
      { icon: "gender", label: "Female" },
      { icon: "location", label: "Lives Off-Campus" },
      { icon: "education", label: "Final Year Undergraduate" },
      { icon: "work", label: "Tightly scheduled; relies on digital planning tools" },
    ],
    frustrations: [
      { label: "Friction", text: "Hates manual data entry; it takes too much time." },
      { label: "Uncertainty", text: "Worrying she will be late for her next seminar if she exercises." },
      { label: "Waste", text: "Frustrated by time lost due to queues or unexpected delays." },
    ],
    coreNeeds: "Cognitive Offloading: needs support to reduce the mental effort of planning exercise. Automation: needs exercise recommendations to fit automatically within existing commitments.",
    dataEvidence: "47% of users are blocked by \u201clack of free time.\u201d 71% consented to share their university timetable for automation.",
  },
];
