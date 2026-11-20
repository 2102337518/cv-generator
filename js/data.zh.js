// =====================================================================
// data.zh.js — 中文简历数据（本工具的唯一数据源，JSON 格式）
// ---------------------------------------------------------------------
// 内容基于原简历，仅做小修改（错别字、大小写、空格规范）。
// 不需要的字段整行删除即可，对应内容自动隐藏。
// 修改后点击「导出数据」可下载为 data.zh.js，替换本文件即永久生效。
// =====================================================================
window.CV_DATA_ZH = {
  "profile": {
    "name": "林镇标",
    "doc_title": "林镇标 · 个人简历",
    "banner": "assets/icons/orig-banner.png",
    "photo": "assets/icons/orig-photo.png",
    "contact": [
      { "icon": "assets/icons/ic-phone.png", "text": "18320503207" },
      { "icon": "assets/icons/ic-mail.png",  "text": "2102337518@qq.com" }
    ],
    "contact2": [
      { "icon": "assets/icons/ic-globe.png", "text": "个人主页：2102337518.github.io", "url": "https://2102337518.github.io" }
    ],
    "homepage": "",
    "homepage_icon": "assets/icons/ic-globe.png"
  },
  "sections": [
    {
      "title": "教育经历",
      "cls": "edu",
      "icon": "assets/icons/ic-edu.png",
      "entries": [
        {
          "icon": "assets/icons/uestc.png",
          "org": "电子科技大学",
          "role": "电子信息 硕士 全日制",
          "period": "2022年09月 - 2025年06月"
        },
        {
          "icon": "assets/icons/gdut.png",
          "org": "广东工业大学",
          "role": "自动化 本科 全日制",
          "period": "2018年09月 - 2022年06月"
        }
      ],
      "itemsLabel": "荣誉奖项：",
      "items": [
        { "text": "2020全国机器人竞赛RoboCon 国一等奖       2023全国机器人竞赛RoboMaster 国二等奖" },
        { "text": "2021全国大学生“挑战杯”竞赛 国一等奖       2020全国大学生节能减排大赛 国三等奖" },
        { "text": "2019 2020 2021 国家励志奖学金                          2022 优秀学生一等奖学金" },
        { "text": "奖学金:大疆赛事精英奖金、康延学业优秀奖学金、大学生智能工匠奖学金、方直奖学金" }
      ]
    },
    {
      "title": "专业技能",
      "icon": "assets/icons/ic-skill.png",
      "cls": "skills",
      "items": [
        { "text": "熟练使用 PyTorch、TensorFlow 等主流深度学习框架，熟悉强化学习相关算法，如 PPO 等" },
        { "text": "熟悉 Transformer、GRU/LSTM、CNN 等的原理及其适用场景，以及在 torch 库中的使用" },
        { "text": "熟悉经典的控制算法包括 PID、LQR、MPC、WBC、IQP，掌握经典控制理论、现代控制理论、动态系统建模，掌握基本系统辨识方法及扰动观测器" },
        { "text": "熟悉机器人学、机器人操作系统 ROS 以及 Linux 环境下常用命令，包括相关工具的使用（gcc、gdb、vim、git 等）" }
      ]
    },
    {
      "title": "工作经历",
      "cls": "bold-org",
      "icon": "assets/icons/ic-work.png",
      "entries": [
        {
          "icon": "assets/icons/cmhk.png",
          "org": "招商局狮子山人工智能实验室",
          "role": "算法工程师",
          "period": "2025年07月 - 至今",
          "projects": [
            {
              "plabel": "项目一",
              "title": "基于注意力机制的感知运控四足机器人",
              "pointsLabel": "工作内容：",
              "points": [
                { "n": "1", "text": "在 Actor 网络中创新引入多头注意力机制，将 CNN 提取的深度视觉特征（Key/Value）与本体感知特征（Query）深度融合，大幅提升对复杂地形的特征提取能力" },
                { "n": "2", "text": "网络串联 GRU 模块以处理连续动态时序信息；针对非平整地形定向设计落足点奖励与 AMP 行走步态，实现 GO2 机器人稳定穿越梅花桩，完成全地形行走的实机部署验证" }
              ]
            },
            {
              "plabel": "项目二",
              "title": "量产落地自研轮足机器人全地形越障",
              "pointsLabel": "工作内容：",
              "points": [
                { "n": "1", "text": "将 DreamWaQ 算法移植至 Isaac Lab 仿真环境中，并在算法中添加 VAE 负载估计模块，完成负载达到机器人自身体重的实机测试" },
                { "n": "2", "text": "从 0 到 1 完成自研轮足机器人的算法实现及落地；搭建并训练自研 Policy，实现爬楼梯与高台等多模态运动策略的稳定输出" }
              ]
            },
            {
              "plabel": "项目三",
              "title": "全尺寸人形机器人走跑一体运控",
              "descLabel": "项目简介：",
              "desc": "基于强化学习的 31 自由度全尺寸人形机器人走跑一体运动控制：采用 PPO + AMP 运动风格先验 + 状态估计器架构，实现行走与跑步的连续切换与全向运动",
              "pointsLabel": "工作内容：",
              "points": [
                { "n": "1", "text": "设计速度跟踪、姿态稳定、足端接触等多维奖励，引入腰部运动幅度惩罚与原地旋转奖励优化步态" },
                { "n": "2", "text": "完成电机扭矩-转速限幅、摩擦建模与域随机化的 sim2real 适配，实现真机部署验证" }
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "实习经历",
      "cls": "bold-org",
      "icon": "assets/icons/ic-intern.png",
      "entries": [
        {
          "icon": "assets/icons/xpeng.png",
          "org": "小鹏汽车-机器人中心",
          "role": "运动控制算法工程师",
          "period": "2024年06月 - 2024年10月",
          "projects": [
            {
              "descLabel": "项目描述：",
              "desc": "具身智能人形机器人控制算法适配与调优",
              "pointsLabel": "工作内容：",
              "points": [
                { "n": "1", "text": "独立负责 VR 遥操作控制 PX5 人形机器人行走：通讯系统方案、MuJoCo 仿真验证、系统状态机与实机调试" },
                { "n": "2", "text": "基于贝塞尔曲线完成步态行走规划与 smart gait 模式切换，实现直膝行走与电机 PVT 控制器参数整定" }
              ]
            }
          ]
        },
        {
          "icon": "assets/icons/dji.png",
          "org": "大疆创新-车载自动驾驶",
          "role": "整车开发工程师",
          "period": "2023年04月 - 2023年10月",
          "projects": [
            {
              "descLabel": "项目描述：",
              "desc": "基于 A-SPICE 的正向开发",
              "pointsLabel": "工作内容：",
              "points": [
                { "n": "1", "text": "负责 RHP 项目正向 A-SPICE：代码静态检查与 Coverity 扫描修复、Cantata 单元测试、基于 gdb 的集成开发" },
                { "n": "2", "text": "AUTOSAR 嵌入式开发与 CAN 通讯验证，完成车辆执行器开环验收" }
              ]
            }
          ]
        },
        {
          "icon": "assets/icons/midea.png",
          "org": "美的集团-中央研究院",
          "role": "机器人工程师",
          "period": "2021年06月 - 2021年09月",
          "projects": [
            {
              "descLabel": "项目描述：",
              "desc": "基于 ROS 的全向移动视觉机械臂复合机器人 AMR",
              "techLabel": "技术栈：",
              "tech": "C/C++、ROS、Linux、轨迹规划、机器人学",
              "pointsLabel": "工作内容：",
              "points": [
                { "n": "1", "text": "负责 UR5 视觉机械臂的规划控制、正逆运动学解算，以及复合机器人整体选型搭建设计" },
                { "n": "2", "text": "编写主控代码实现全向移动底盘路径规划，采用三次 B 样条曲线进行局部路径规划" },
                { "n": "3", "text": "采用速度环、位置环串级 PID 跟踪控制，实现复合机器人 AMR 边夹取边移动协同控制" }
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "竞赛经历",
      "cls": "bold-org",
      "icon": "assets/icons/ic-race.png",
      "entries": [
        {
          "icon": "assets/icons/robomaster.png",
          "org": "大疆 ROBOMASTER-智在飞翔无人飞行器智能感知技术竞赛",
          "role": "",
          "projects": [
            {
              "descLabel": "项目描述：",
              "desc": "复杂环境下无人机的自主穿圈飞行",
              "pointsLabel": "主要工作：",
              "points": [
                { "n": "1", "text": "完成 Jetson Orin NX 嵌入式软硬件开发，ARM 架构下定位算法 VINS-Fusion、规划算法 Ego-Planner 部署；同时完成相关算法的功能调度和参数整定" },
                { "n": "2", "text": "完成无人机姿态估计器、控制内环（姿态环、角速度环）的参数整定，采用前馈+PD 线性控制器完成规划模块的轨迹跟踪" },
                { "n": "3", "text": "基于微分平坦理论实现无人机 SE(3) 全姿态控制，同时基于运动学模型和 LQR 实现无人机的轨迹跟踪控制" }
              ],
              "resultLabel": "成果描述：",
              "result": "无人飞行器智能感知技术竞赛综合赛二等奖"
            }
          ]
        },
        {
          "icon": "assets/icons/robocon.png",
          "org": "全国大学生机器人竞赛 ROBOCON",
          "role": "电控组组长",
          "projects": [
            {
              "descLabel": "项目描述：",
              "desc": "多专业协作设计两台轮式移动机器人，实现自主移动完成抛踢橄榄球比赛任务",
              "pointsLabel": "主要工作：",
              "points": [
                { "n": "1", "text": "完成激光、光电等传感器选型与 STM32F4 主控开发，实现多传感器数据融合与踢球/抛球机构电机控制" },
                { "n": "2", "text": "采用正交码盘 + 陀螺仪实现全场定位算法，完成 PID 参数优化与机构电控迭代" },
                { "n": "3", "text": "基于 Webots 的轨迹优化仿真，采用 4 阶贝塞尔曲线实现平滑轨迹" }
              ],
              "resultLabel": "成果描述：",
              "result": "获得全国一等奖（全国季军）、作为中国代表队参加亚太 ABU Robocon 国际交流赛"
            }
          ]
        }
      ]
    }
  ]
};
