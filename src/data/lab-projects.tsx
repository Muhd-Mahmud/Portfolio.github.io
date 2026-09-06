import {
  Bot,
  Radar,
  Cog,
  ScanEye,
  Plane,
  Waypoints,
  Dog,
  Brain,
  Cpu,
  Gauge,
  Network,
  Boxes,
  type LucideIcon,
} from "lucide-react";

export type LabStatus = "completed" | "in-progress" | "planned";

// One captured artifact from the build — screenshot, render, or diagram.
// `image` is a path under /public, resolved against the Vite base at render time.
export type Evidence = {
  label: string;
  title: string;
  caption: string;
  image?: string;
};

// Generic pipeline shape: a linear head, an optional parallel branch, and an
// optional node the branch merges back into.
export type Workflow = {
  steps: string[];
  branch?: string[];
  merge?: string;
  note: string;
};

// Everything below `overview` is optional so unfinished weeks keep rendering
// the "coming soon" state without needing placeholder data.
export type LabProject = {
  slug: string;
  week: number;
  title: string;
  morphology: string;
  simulation: string;
  focus: string;
  tech: string[];
  overview: string;
  icon: LucideIcon;
  accent: string; // hex accent used for hover glow / tech badges
  status?: LabStatus;
  subtitle?: string;
  description?: string[];
  objective?: string;
  stack?: { label: string; value: string }[];
  workflow?: Workflow;
  evidence?: Evidence[];
  learned?: string[];
  next?: { label: string; slug?: string };
  repo?: string;
  artifacts?: { label: string; file: string }[];
};

// 12-Week Build-First Roadmap — Robotics Simulation Lab.
// Each entry maps to a vertical slice: model a robot, wire sensors,
// run a simulator, add control/learning, measure, document.
export const labProjects: LabProject[] = [
  {
    slug: "amr-foundations",
    week: 1,
    title: "AMR Foundations — CAD to ROS 2 Simulation",
    subtitle:
      "Designing, modelling and simulating a differential-drive mobile robot using CAD, URDF, Gazebo and RViz.",
    morphology: "Differential-drive mobile robot",
    simulation: "Gazebo + ROS 2",
    focus: "CAD → URDF → simulation",
    tech: ["Onshape", "ROS 2", "Gazebo", "URDF", "RViz", "TF2"],
    overview:
      "An original CAD model of a differential-drive mobile robot, converted into a ROS 2 robot description and taken all the way through Gazebo simulation, RViz visualization and a verified TF frame tree.",
    icon: Bot,
    accent: "#a855f7",
    status: "completed",
    repo: "https://github.com/Muhd-Mahmud/Pivot",
    description: [
      "As the first project in my Robotics Simulation Lab, I designed and modelled a differential-drive mobile robot and converted the mechanical design into a ROS 2-compatible robot description.",
      "The project follows the workflow from mechanical CAD → URDF → Gazebo → RViz → TF, providing a foundation for future work in autonomous navigation, SLAM, sensor integration and robotic control.",
      "The primary objective was not only to produce a working simulation, but to understand how a physical robot is represented computationally and how its mechanical structure translates into a ROS 2 system.",
    ],
    objective:
      "Design a differential-drive mobile robot and establish its digital representation in ROS 2, from mechanical CAD through URDF and simulation.",
    stack: [
      { label: "CAD", value: "Onshape" },
      { label: "Robotics", value: "ROS 2" },
      { label: "Simulation", value: "Gazebo" },
      { label: "Visualization", value: "RViz" },
      { label: "Robot description", value: "URDF" },
      { label: "Coordinate transforms", value: "TF2" },
    ],
    workflow: {
      steps: ["CAD Design", "Robot Geometry", "URDF"],
      branch: ["Gazebo", "RViz"],
      merge: "TF2 — Frame Structure",
      note: "The CAD model defines the mechanical structure, while the URDF provides its computational representation as links and joints. Gazebo provides the simulation environment, RViz provides ROS-based visualization, and TF defines the spatial relationships between the robot's coordinate frames.",
    },
    evidence: [
      {
        label: "Evidence 01",
        title: "CAD model",
        caption:
          "Original CAD design: mechanical model of the differential-drive mobile robot, created in Onshape specifically for this project.",
        image: "lab/amr-foundations/cad.png",
      },
      {
        label: "Evidence 02",
        title: "Gazebo simulation",
        caption:
          "The custom robot model successfully spawned into a simulated environment.",
        image: "lab/amr-foundations/gazebo.png",
      },
      {
        label: "Evidence 03",
        title: "RViz visualization",
        caption:
          "ROS 2 robot description visualized within the ROS ecosystem.",
        image: "lab/amr-foundations/rviz.png",
      },
      {
        label: "Evidence 04",
        title: "TF frame architecture",
        caption:
          "Every link's coordinate frame rendered in RViz — the spatial relationships that define the robot's structure. The full frame tree is available as a PDF below.",
        image: "lab/amr-foundations/tf-tree.png",
      },
    ],
    artifacts: [
      { label: "TF frame tree (PDF)", file: "lab/amr-foundations/tf-tree.pdf" },
    ],
    learned: [
      "How a CAD assembly translates into a robot description.",
      "How URDF represents links and joints.",
      "How robot descriptions are loaded into Gazebo.",
      "How ROS 2 and RViz interact with the robot model.",
      "How TF represents spatial relationships between robot components.",
      "How simulation provides the foundation for future autonomy experiments.",
    ],
    next: {
      label: "Lab 02 — Autonomous Mobile Robot: SLAM + Navigation",
      slug: "amr-slam-nav2",
    },
  },
  {
    slug: "amr-slam-nav2",
    week: 2,
    title: "AMR Autonomy — SLAM + Nav2",
    morphology: "Autonomous mobile robot",
    simulation: "Gazebo + ROS 2 + Nav2",
    focus: "SLAM, path planning, obstacle avoidance",
    tech: ["ROS 2", "SLAM Toolbox", "Nav2", "Gazebo"],
    overview:
      "Turning the base robot into an autonomous one: LiDAR-based SLAM to build and save a map, then Nav2 for goal-directed navigation with obstacle avoidance.",
    icon: Radar,
    accent: "#22d3ee",
  },
  {
    slug: "manipulator-kinematics",
    week: 3,
    title: "Manipulator Foundations — 4-DOF Arm Kinematics",
    morphology: "Manipulator",
    simulation: "PyBullet / Gazebo",
    focus: "Forward & inverse kinematics, joint control",
    tech: ["PyBullet", "FK/IK", "DH parameters", "PID"],
    overview:
      "Model my planned 4-DOF belt-drive arm in simulation before hardware debugging: forward and inverse kinematics, joint-space PID, and end-effector trajectory tracking.",
    icon: Cog,
    accent: "#10b981",
  },
  {
    slug: "manipulation-vision",
    week: 4,
    title: "Manipulation — Motion Planning + Vision Pick-and-Place",
    morphology: "Manipulator",
    simulation: "Gazebo + ROS 2 + MoveIt",
    focus: "Perception → planning → control",
    tech: ["MoveIt 2", "OpenCV", "RGB-D", "ROS 2"],
    overview:
      "Turning the arm into a manipulation system: detect an object with an RGB-D camera, plan a collision-free approach, and execute a pick-and-place with grasp checking.",
    icon: ScanEye,
    accent: "#38bdf8",
  },
  {
    slug: "uav-px4",
    week: 5,
    title: "Aerial Robotics — PX4 Quadrotor Autonomy",
    morphology: "UAV",
    simulation: "Gazebo + PX4 SITL",
    focus: "State estimation, offboard control",
    tech: ["PX4 SITL", "ROS 2", "Gazebo", "Offboard mode"],
    overview:
      "A single simulated quadrotor under PX4 SITL: understand vehicle state and sensors, command takeoff and waypoints, and control it autonomously via ROS 2.",
    icon: Plane,
    accent: "#f59e0b",
  },
  {
    slug: "uav-swarm-avce",
    week: 6,
    title: "Multi-UAV — AVCE Swarm Exploration",
    morphology: "UAV swarm",
    simulation: "Gazebo + PX4",
    focus: "Decentralized exploration, 3D mapping",
    tech: ["Decentralized swarm", "PPO", "3D mapping", "ROS 2"],
    overview:
      "My AVCE work turned into a reproducible multi-UAV benchmark: decentralized swarm rules, per-agent local observations aggregated into a global map, with coverage and path metrics.",
    icon: Waypoints,
    accent: "#f43f5e",
  },
  {
    slug: "quadruped-control",
    week: 7,
    title: "Legged Robotics — Quadruped Dynamics + PD Locomotion",
    morphology: "Legged / quadruped",
    simulation: "MuJoCo",
    focus: "Dynamics, PD control, gait generation",
    tech: ["MuJoCo", "Joint-space PD", "Gait generator"],
    overview:
      "Understanding the mechanics of locomotion before asking an RL agent to learn it: a simulated quadruped stands and walks with a classical PD controller and simple gait.",
    icon: Dog,
    accent: "#84cc16",
  },
  {
    slug: "quadruped-rl",
    week: 8,
    title: "Legged Learning — PPO Quadruped in Gymnasium",
    morphology: "Legged / quadruped",
    simulation: "MuJoCo + Gymnasium + SB3",
    focus: "Reinforcement learning",
    tech: ["Gymnasium", "Stable-Baselines3", "PPO", "MuJoCo"],
    overview:
      "Learning RL from the environment-design side: a Gymnasium-compatible quadruped env with a justified reward, trained with PPO across multiple seeds with saved curves.",
    icon: Brain,
    accent: "#8b5cf6",
  },
  {
    slug: "humanoid-rl",
    week: 9,
    title: "Humanoid — Standing and Locomotion in MuJoCo",
    morphology: "Humanoid",
    simulation: "MuJoCo + Gymnasium",
    focus: "Whole-body control and RL",
    tech: ["MuJoCo", "Gymnasium", "PPO", "Whole-body control"],
    overview:
      "The most transferable part of humanoid work: first standing, then controlled locomotion, with a learning baseline, disturbance experiments, and failure-mode analysis.",
    icon: Cpu,
    accent: "#ec4899",
  },
  {
    slug: "model-based-mpc",
    week: 10,
    title: "Model-Based Robotics — System ID + MPC",
    morphology: "Reusable (AMR / UAV / legged)",
    simulation: "MuJoCo / Gazebo",
    focus: "Model-based control",
    tech: ["System identification", "MPC", "PID baseline"],
    overview:
      "A principled contrast to model-free PPO: learn a dynamics model from simulation data, predict short horizons, and close the loop with MPC benchmarked against a PID baseline.",
    icon: Gauge,
    accent: "#06b6d4",
  },
  {
    slug: "knowledge-robotics",
    week: 11,
    title: "Knowledge-Based Robotics — World Model + Task Planning",
    morphology: "AMR + manipulator",
    simulation: "Gazebo + ROS 2",
    focus: "Knowledge representation, symbolic planning",
    tech: ["World model", "Task planner", "State machine", "ROS 2"],
    overview:
      "The bridge from low-level autonomy to intelligent agents: give a robot explicit knowledge of objects, rooms, and capabilities, then plan and execute a multi-step task.",
    icon: Network,
    accent: "#f97316",
  },
  {
    slug: "embodied-ai-capstone",
    week: 12,
    title: "Embodied AI Capstone — Multi-Robot Mission",
    morphology: "AMR + UAV + manipulator",
    simulation: "Gazebo + ROS 2 (+ MuJoCo)",
    focus: "Knowledge + planning + learned control",
    tech: ["Multi-robot", "Task-level planning", "ROS 2", "MuJoCo"],
    overview:
      "The whole portfolio in one mission: multiple robot types cooperate under a shared task-level plan, each using its specialized autonomy stack, with a measured success rate.",
    icon: Boxes,
    accent: "#e11d48",
  },
];

export function getLabProject(slug: string): LabProject | undefined {
  return labProjects.find((p) => p.slug === slug);
}
