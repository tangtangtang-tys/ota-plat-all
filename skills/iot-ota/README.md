# IoT OTA Skills

这是一套面向当前 OTA 升级管理系统项目沉淀的专属 skills，用来让 AI 更像一个熟悉你们业务、架构和文档风格的物联网 OTA 产品专家。

## Skills 清单

| Skill | 适用场景 |
| --- | --- |
| `ota-prd-writer` | 写 OTA 需求文档、迭代需求、功能说明、产品方案。 |
| `ota-strategy-designer` | 设计指定版本号、文件导入、手动导入、灰度升级、批量升级、差分升级策略。 |
| `ota-risk-reviewer` | 评审 OTA 需求、升级策略、状态流转、审批流程、异常场景和边界风险。 |
| `ota-user-guide-writer` | 编写操作指南、用户手册、页面字段说明、FAQ、培训文档。 |
| `ota-acceptance-tester` | 生成验收标准、测试用例、测试点、边界条件和提测清单。 |

## 共享资料

[references/ota-domain-model.md](references/ota-domain-model.md) 是 OTA 产品领域规则底座，包含：

- 整包和差分包规则。
- 差分升级仅 4G 模组支持的限制。
- 指定版本号、文件导入、手动导入三类升级策略。
- 不同策略的审批差异。
- 任务周期、状态流转、设备校验和监控规则。
- OTA2.0 的产品规则补充：活跃设备扫描、后台识别设备归属、未知归属候选认领、taskId 隔离、设备互斥等。

[references/ota2-architecture.md](references/ota2-architecture.md) 是 OTA2.0 技术架构和工作流程资料，包含：

- 大区中心 API、边缘 API、边缘执行、产品线网关、Redis、MongoDB、RabbitMQ、审批系统的职责边界。
- 大区与 regionId 映射。
- 文件/手动导入的设备归属识别和候选认领。
- 边缘执行、taskId 隔离、设备互斥、升级数量上限口径。
- 进度聚合、边缘明细查询、设备规模快照和中止语义。

新增 OTA skill 时，优先引用 `ota-domain-model.md`。如果涉及 OTA2.0 架构、执行、统计、区域明细、候选认领或中止流程，再引用 `ota2-architecture.md`。

## 后续可扩展 Skills

- `ota-prototype-reviewer`：评审原型页面和交互流程。
- `ota-data-dictionary-writer`：生成字段字典、枚举定义和状态说明。
- `ota-release-plan-writer`：生成 OTA 发布计划、灰度节奏和运营通知。
- `ota-failure-analysis-helper`：分析升级失败设备数据并给出重试策略。
