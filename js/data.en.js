// =====================================================================
// data.en.js — English resume data (same layout as the Chinese version)
// ---------------------------------------------------------------------
// Faithful English translation of the original Chinese resume,
// trimmed for a two-page layout.
// =====================================================================
window.CV_DATA_EN = {
  "profile": {
    "name": "Zhenbiao Lin",
    "resume_class": "en",
    "doc_title": "Zhenbiao Lin · Resume",
    "banner": "assets/icons/orig-banner.png",
    "photo": "assets/icons/orig-photo.png",
    "contact": [
      { "icon": "assets/icons/ic-phone.png", "text": "+86 18320503207" },
      { "icon": "assets/icons/ic-mail.png",  "text": "2102337518@qq.com" }
    ],
    "contact2": [
      { "icon": "assets/icons/ic-globe.png", "text": "Homepage: 2102337518.github.io", "url": "https://2102337518.github.io" }
    ],
    "homepage": "",
    "homepage_icon": "assets/icons/ic-globe.png"
  },
  "sections": [
    {
      "title": "Education",
      "cls": "edu",
      "icon": "assets/icons/ic-edu.png",
      "entries": [
        {
          "icon": "assets/icons/uestc.png",
          "org": "University of Electronic Science and Technology of China (UESTC)",
          "role": "Electronic Information, M.S. (Full-time)",
          "period": "Sep 2022 - Jun 2025"
        },
        {
          "icon": "assets/icons/gdut.png",
          "org": "Guangdong University of Technology (GDUT)",
          "role": "Automation, B.S. (Full-time)",
          "period": "Sep 2018 - Jun 2022"
        }
      ],
      "itemsLabel": "Honors & Awards: ",
      "items": [
        { "text": "2020 RoboCon National Robot Competition, National First Prize       2023 RoboMaster National Robot Competition, National Second Prize" },
        { "text": "2021 National \"Challenge Cup\" Competition, National First Prize       2020 National Energy Conservation & Emission Reduction Competition, National Third Prize" },
        { "text": "2019 / 2020 / 2021 National Endeavor Scholarship                          2022 First-Class Outstanding Student Scholarship" },
        { "text": "Scholarships: DJI Elite Competition Award, Kangyan Academic Excellence Scholarship, Smart Craftsman Scholarship, Fangzhi Scholarship" }
      ]
    },
    {
      "title": "Skills",
      "icon": "assets/icons/ic-skill.png",
      "cls": "skills",
      "items": [
        { "text": "Deep learning frameworks: PyTorch, TensorFlow; reinforcement learning algorithms such as PPO" },
        { "text": "Network architectures: Transformer, GRU/LSTM, CNN — principles, use cases, and usage in the torch library" },
        { "text": "Control: PID, LQR, MPC, WBC, IQP; classical and modern control theory, dynamic system modeling, system identification and disturbance observers" },
        { "text": "Robotics: ROS, Linux toolchain (gcc, gdb, vim, git)" }
      ]
    },
    {
      "title": "Work Experience",
      "cls": "bold-org",
      "icon": "assets/icons/ic-work.png",
      "entries": [
        {
          "icon": "assets/icons/cmhk.png",
          "org": "Shizishan AI Lab, China Merchants Group",
          "role": "Algorithm Engineer",
          "period": "Jul 2025 - Present",
          "projects": [
            {
              "plabel": "Project 1",
              "title": "Attention-Based Perceptive Locomotion for Quadruped Robots",
              "pointsLabel": "Work Details: ",
              "points": [
                { "n": "1", "text": "Introduced multi-head attention into the Actor network to fuse CNN depth-visual features (Key/Value) with proprioceptive features (Query), greatly improving feature extraction on complex terrain" },
                { "n": "2", "text": "Added a GRU module for continuous dynamic temporal information; designed foothold rewards and AMP gaits for uneven terrain, achieving stable plum-blossom-pile traversal on the GO2 robot with real-robot all-terrain deployment" }
              ]
            },
            {
              "plabel": "Project 2",
              "title": "In-House Wheel-Legged Robot for Mass-Production All-Terrain Obstacle Crossing",
              "pointsLabel": "Work Details: ",
              "points": [
                { "n": "1", "text": "Ported DreamWaQ to the Isaac Lab simulator and added a VAE load-estimation module, passing real-robot payload tests up to the robot's own body weight" },
                { "n": "2", "text": "Delivered the in-house wheel-legged robot's algorithms from 0 to 1; built and trained an in-house Policy for stable multi-modal locomotion such as stair climbing and platform ascent" }
              ]
            },
            {
              "plabel": "Project 3",
              "title": "Full-Size Humanoid Walk-Run Integrated Locomotion",
              "descLabel": "Project Description: ",
              "desc": "RL-based walk-run locomotion control for a full-size 31-DOF humanoid: a PPO + AMP motion-style prior + state-estimator architecture enabling smooth walk-run transitions and omnidirectional locomotion",
              "pointsLabel": "Work Details: ",
              "points": [
                { "n": "1", "text": "Designed multi-term rewards (velocity tracking, posture stability, foot contact) with waist-motion penalties and in-place rotation rewards" },
                { "n": "2", "text": "Completed sim2real adaptation (motor torque-speed limiting, friction modeling, domain randomization) and real-robot deployment" }
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "Internship Experience",
      "cls": "bold-org",
      "icon": "assets/icons/ic-intern.png",
      "entries": [
        {
          "icon": "assets/icons/xpeng.png",
          "org": "XPeng Motors - Robotics Center",
          "role": "Motion Control Algorithm Engineer",
          "period": "Jun 2024 - Oct 2024",
          "projects": [
            {
              "descLabel": "Project Description: ",
              "desc": "Adaptation and tuning of control algorithms for the humanoid robot",
              "pointsLabel": "Work Details: ",
              "points": [
                { "n": "1", "text": "Independently implemented VR teleoperation for PX5 humanoid walking: communication design, MuJoCo simulation, state machine, and real-robot debugging" },
                { "n": "2", "text": "Bézier-curve gait planning and smart-gait switching for straight-knee walking, plus motor PVT controller tuning" }
              ]
            }
          ]
        },
        {
          "icon": "assets/icons/dji.png",
          "org": "DJI - Automotive",
          "role": "Vehicle Development Engineer",
          "period": "Apr 2023 - Oct 2023",
          "projects": [
            {
              "descLabel": "Project Description: ",
              "desc": "Forward development based on A-SPICE",
              "pointsLabel": "Work Details: ",
              "points": [
                { "n": "1", "text": "Led the RHP project's forward A-SPICE: static code analysis and Coverity remediation, Cantata unit testing, and gdb integration development" },
                { "n": "2", "text": "AUTOSAR embedded development and CAN communication validation; vehicle actuator open-loop acceptance" }
              ]
            }
          ]
        },
        {
          "icon": "assets/icons/midea.png",
          "org": "Midea Group - Corporate Research Center",
          "role": "Robotics Engineer",
          "period": "Jun 2021 - Sep 2021",
          "projects": [
            {
              "descLabel": "Project Description: ",
              "desc": "ROS-based omnidirectional vision-guided manipulator AMR",
              "techLabel": "Tech Stack: ",
              "tech": "C/C++, ROS, Linux, trajectory planning, robotics",
              "pointsLabel": "Work Details: ",
              "points": [
                { "n": "1", "text": "Planning and control of the UR5 vision manipulator, forward/inverse kinematics, and overall design and construction of the mobile manipulator" },
                { "n": "2", "text": "Main control code for omnidirectional chassis path planning with cubic B-spline local planning" },
                { "n": "3", "text": "Cascaded velocity/position PID tracking for simultaneous pick-and-move coordination of the AMR" }
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "Competitions",
      "cls": "bold-org",
      "icon": "assets/icons/ic-race.png",
      "entries": [
        {
          "icon": "assets/icons/robomaster.png",
          "org": "DJI RoboMaster ZhiZai FeiXiang UAV Intelligent Perception Competition",
          "role": "",
          "projects": [
            {
              "descLabel": "Project Description: ",
              "desc": "Autonomous gate-crossing flight of a UAV in complex environments",
              "pointsLabel": "Main Work: ",
              "points": [
                { "n": "1", "text": "Jetson Orin NX embedded software/hardware development; deployed VINS-Fusion localization and Ego-Planner planning on ARM with function scheduling and parameter tuning" },
                { "n": "2", "text": "Tuned the UAV attitude estimator and inner loops (attitude, angular-rate); trajectory tracking with feedforward + PD linear controllers" },
                { "n": "3", "text": "SE(3) full-attitude control via differential flatness; trajectory tracking based on the kinematic model and LQR" }
              ],
              "resultLabel": "Result: ",
              "result": "Second Prize in the UAV intelligent perception technology competition"
            }
          ]
        },
        {
          "icon": "assets/icons/robocon.png",
          "org": "National College Robot Competition (ROBOCON)",
          "role": "Electronics Team Lead",
          "projects": [
            {
              "descLabel": "Project Description: ",
              "desc": "Designed two wheeled mobile robots to autonomously throw and kick a rugby ball in the competition",
              "pointsLabel": "Main Work: ",
              "points": [
                { "n": "1", "text": "Sensor selection and STM32F4 main-control development for multi-sensor data fusion and kicking/throwing mechanism motor control" },
                { "n": "2", "text": "Full-field localization with quadrature encoders and gyroscope; PID tuning and electromechanical iteration" },
                { "n": "3", "text": "Trajectory optimization simulation in Webots with 4th-order Bézier curves for smooth trajectories" }
              ],
              "resultLabel": "Result: ",
              "result": "National First Prize (3rd place nationally); represented China at the Asia-Pacific ABU Robocon International Contest"
            }
          ]
        }
      ]
    }
  ]
};
