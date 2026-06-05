function defaultTaskFilters() {
  return {
    keyword: "",
    status: "全部",
    creator: "",
    createdDate: "",
    method: "全部",
    packageType: "全部",
  };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

const state = {
  route: "task-list",
  topRegion: "中国",
  packageType: "whole",
  strategy: "version",
  previewScenario: "mixed",
  quantityMode: "full",
  taskScope: "current",
  syncRegions: ["中国", "香港"],
  batchQuantity: 0,
  createStep: 1,
  regionDropdownOpen: false,
  conditionRegionDropdownOpen: false,
  conditionRegionEnabled: false,
  regionOperatorOpen: false,
  regionOperator: "等于",
  quickRangeDays: 7,
  datePickerOpen: false,
  taskStartAt: "",
  taskEndAt: "",
  form: {
    taskName: "IPC-杭州低功耗_安全补丁升级",
    targetVersion: "23.422.209.17",
    upgradeDesc: "修复低功耗设备夜间唤醒异常，按杭州低功耗大区灰度发布。",
  },
  errors: {},
  selectedRegions: ["中国 / 杭州低功耗", "中国 / 杭州"],
  conditionRegions: ["中国 / 杭州低功耗"],
  selectedVersions: ["23.422.208.91", "23.110.105.46", "23.110.105.43", "10.176.42"],
  manualDevices: [
    { id: 1, deviceId: "IPC-HZ-LP-000128", version: "23.110.105.46", region: "杭州低功耗", status: "可升级", error: "" },
    { id: 2, deviceId: "IPC-HZ-LP-000129", version: "23.110.105.43", region: "杭州低功耗", status: "可升级", error: "" },
  ],
  manualNextId: 3,
  fileUploaded: false,
  fileUploadStatus: "idle",
  uploadProgress: 0,
  uploadFileName: "",
  uploadDeviceCount: 0,
  draftTask: null,
  editingDraft: false,
  taskCreatorDropdownOpen: false,
  taskFilters: defaultTaskFilters(),
  columnSettingsOpen: false,
  taskCompact: true,
  taskPage: 1,
  taskPageSize: 20,
  detailStatus: "升级中",
  detailMetricMode: "versionFull",
  detailTab: "overview",
  detailDeviceKeyword: "",
  detailSourceExpanded: false,
  showRequirementNotes: true,
  flowTab: "progress",
  visibleTaskColumns: {
    method: true,
    packageType: true,
    targetVersion: true,
    total: true,
    time: true,
    result: true,
    region: true,
    creator: true,
    createdAt: true,
  },
  modal: null,
  toast: "",
  navCollapsed: {
    ota: false,
    logs: false,
    users: false,
  },
  role: "系统管理员",
  roleTab: "permissions",
};

const navGroups = [
  { key: "ota", title: "OTA升级", icon: "home", items: [["task-list", "任务列表"]] },
  { key: "logs", title: "日志管理", icon: "log", items: [["operation-log", "操作日志"], ["approval-log", "审批日志"]] },
  { key: "users", title: "用户角色", icon: "users", items: [["user-list", "用户列表"], ["role-list", "角色权限"]] },
];

const docNavItems = [["requirements-doc", "需求说明"]];

const syncRegionOptions = ["中国", "香港", "法兰福克", "硅谷"];
const topRegionOptions = ["中国", "香港", "法兰福克", "硅谷"];

const taskStatusMeta = {
  "待执行": { color: "gray", actions: ["detail"] },
  "升级中": { color: "blue", actions: ["detail", "end"] },
  "已完成": { color: "green", actions: ["detail", "copyRebuild"] },
  "已结束": { color: "gray", actions: ["detail", "copyRebuild"] },
  "待发布": { color: "orange", actions: ["editDraft", "deleteDraft"] },
  "待审批": { color: "orange", actions: ["detail"] },
  "已驳回": { color: "red", actions: ["detail", "copyRebuild"] },
  "已失效": { color: "red", actions: ["detail", "copyRebuild"] },
};

const taskListRows = [
  { id: "OTA202606030001", name: "IPC-多大区安全补丁同步升级", method: "指定版本", quantityMode: "full", packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-06-10 09:00:00~2026-06-17 09:00:00", result: null, region: "中国", status: "待审批", creator: "汤彦珊", createdAt: "2026-06-03 17:20:18", syncBatchId: "SYNC-20260603-0001", syncRegions: ["中国", "香港", "法兰福克", "硅谷"] },
  { id: "OTA202606030002", name: "杭州低功耗灰度定时升级", method: "指定版本", quantityMode: "batch", planned: 5000, packageType: "差分包", targetVersion: "23.422.209.17", total: null, time: "2026-06-04 10:00:00~2026-06-11 10:00:00", result: null, region: "中国/杭州低功耗", status: "待执行", creator: "江锐", createdAt: "2026-06-03 16:42:05" },
  { id: "OTA202606010001", name: "文件导入_法兰福克补丁升级", method: "文件导入", packageType: "整包", targetVersion: "23.422.209.17", total: "664", time: "2026-06-01 18:59:01~2026-06-30 18:59:01", result: { success: 346, failed: 0, total: 664 }, region: "法兰福克", status: "升级中", creator: "钱江涛", createdAt: "2026-06-01 18:02:14" },
  { id: "OTA202605130001", name: "低功耗设备夜间唤醒修复", method: "指定版本", quantityMode: "full", packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-05-13 11:25:20~2026-06-02 11:25:20", result: { matched: 6505, success: 6488, failed: 17 }, region: "中国/杭州低功耗", status: "已完成", creator: "江锐", createdAt: "2026-05-13 11:22:42" },
  { id: "OTA202605190001", name: "黑光升级双光测试", method: "文件导入", packageType: "差分包", targetVersion: "23.110.105.46", total: "1196", time: "2026-05-19 16:33:42~2026-06-19 16:33:42", result: { success: 730, failed: 8, total: 1196 }, region: "中国/杭州", status: "已结束", creator: "钱江涛", createdAt: "2026-05-19 16:31:18" },
  { id: "OTA202605090002", name: "华拓测试数据异常明细", method: "文件导入", packageType: "整包", targetVersion: "23.422.209.17", total: "327", time: "2026-05-09 16:51:20~2026-08-09 16:51:20", result: null, region: "中国/杭州低功耗", status: "已驳回", creator: "江锐", createdAt: "2026-05-09 16:49:28" },
  { id: "OTA202605090001", name: "审批超时_香港安全补丁升级", method: "指定版本", quantityMode: "full", packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-05-09 16:40:34~2026-06-09 16:40:34", result: null, region: "香港", status: "已失效", creator: "汤彦珊", createdAt: "2026-05-09 16:37:40" },
  { id: "OTA202605080001", name: "硅谷摄像机批量灰度", method: "指定版本", quantityMode: "batch", planned: 800, packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-05-08 10:00:00~2026-05-18 10:00:00", result: { matched: 640, success: 620, failed: 20 }, region: "硅谷", status: "升级中", creator: "江锐", createdAt: "2026-05-08 09:42:16" },
];

const taskStatusOptions = ["全部", "待发布", "待审批", "待执行", "升级中", "已完成", "已结束", "已驳回", "已失效"];
const taskMethodOptions = ["全部", "指定版本", "文件导入", "手动导入"];
const taskPackageOptions = ["全部", "整包", "差分包"];

const taskColumnOptions = [
  ["method", "升级方式"],
  ["packageType", "升级包"],
  ["targetVersion", "目标版本"],
  ["total", "升级规模"],
  ["time", "任务时间"],
  ["result", "执行结果"],
  ["region", "任务所属大区"],
  ["creator", "创建人"],
  ["createdAt", "创建时间"],
];

const deviceRows = [
  "VQDG2122086ZPUF",
  "VQDG2122132LYVU",
  "VQDG2122182RUJZ",
  "VQDG2122200DZPZ",
  "VQDG2122207UJGM",
  "VQDG2122213CSHI",
  "VQDG2122223DLLB",
  "VQDG2122246ZHHH",
  "VQDG2122268SKUJ",
  "VQDG2122292MONX",
];

const operationLogs = [
  ["2026-05-21 14:17:48", "钱江涛", "任务列表", "[发布任务]", "发布任务: [黑光升级]"],
  ["2026-05-21 09:25:02", "钱江涛", "任务列表", "[发布任务]", "发布任务: [升级]"],
  ["2026-05-19 17:09:35", "钱江涛", "任务列表", "[发布任务]", "发布任务: [黑光升级双光]"],
  ["2026-05-19 16:33:42", "钱江涛", "任务列表", "[中止任务]", "中止任务: [黑光升级双光测试]"],
  ["2026-05-13 18:04:49", "江锐", "任务列表", "[发布任务]", "发布任务: [4.17-5.7测试记录(中视讯-沃视佳)]"],
  ["2026-05-13 11:48:23", "江锐", "任务列表", "[发布任务]", "发布任务: [所有id综合导入]"],
  ["2026-05-09 16:51:52", "江锐", "任务列表", "[发布任务]", "发布任务: [测试数据（华拓20260507）异常明细 23.2...]"],
  ["2026-04-28 18:24:05", "江锐", "任务列表", "[发布任务]", "发布任务: [23.110.105.XX ---升级到最新23.110.105...]"],
];

const approvalLogs = [
  ["2026-05-21 14:18:22", "黑光升级", "钱江涛", "提交审批", "待审批", "钱江涛提交至钱江涛"],
  ["2026-05-21 14:20:05", "黑光升级", "钱江涛", "审批通过", "待执行", "钱江涛审批通过"],
  ["2026-05-19 09:26:31", "升级", "钱江涛", "审批通过", "升级中", "审批通过后进入执行队列"],
  ["2026-05-13 11:22:46", "Allid综合导入", "江锐", "审批通过", "升级中", "江锐提交至钱江涛，审批通过"],
  ["2026-05-09 16:49:28", "测试数据异常明细", "江锐", "审批驳回", "已驳回", "目标版本与大区策略不一致"],
];

const users = [
  ["严国潮", "系统管理员", "IPC", "2025-12-24 14:48:27"],
  ["严鹏", "默认人员", "IPC", "2025-12-24 14:48:27"],
  ["何思虎", "默认人员", "IPC", "2025-12-24 14:48:27"],
  ["凌紫妍", "默认人员", "IPC", "2025-12-24 14:48:27"],
  ["刘亮", "默认人员", "IPC", "2025-12-24 14:48:27"],
  ["刘川", "默认人员", "IPC", "2025-12-24 14:48:27"],
  ["刘文波", "默认人员", "IPC", "2025-12-24 14:48:27"],
  ["刘林胶", "测试人员", "IPC", "2025-12-24 14:48:27"],
  ["张元/Alice", "默认人员", "IPC", "2025-12-24 14:48:27"],
  ["张杰洪", "默认人员", "IPC", "2025-12-24 14:48:27"],
];

const roles = [
  { name: "系统管理员", count: 15, note: "系统管理员，拥有OTA系统所有产线的全部权限", default: true },
  { name: "产线主管", count: 7, note: "负责审批升级任务，关注风险控制和产线覆盖范围" },
  { name: "测试人员", count: 11, note: "负责创建任务、导入设备、观察升级结果" },
  { name: "默认人员", count: 47, note: "只允许查看列表和详情，不允许创建或发布任务" },
];

const firmwareVersions = [
  { version: "23.422.208.91", count: 6505, diffReady: true, note: "4G 模组基线匹配" },
  { version: "23.110.105.46", count: 2310, diffReady: true, note: "安全补丁版本" },
  { version: "23.110.105.43", count: 1250, diffReady: false, note: "无可用差分包" },
  { version: "10.176.42", count: 664, diffReady: false, note: "整包可跨版本升级" },
];

const regionScopeOptionsByTopRegion = {
  中国: [
    "中国全部",
    "中国 / 杭州",
    "中国 / 杭州低功耗",
    "中国 / 深圳",
    "中国 / 成都",
    "中国 / 上海（宠物）",
  ],
  香港: ["香港全部"],
  法兰福克: ["法兰福克全部"],
  硅谷: ["硅谷全部"],
};

const strategyMeta = {
  version: {
    title: "指定版本号升级",
    short: "指定版本",
    desc: "按当前指定版本批量升级到目标版本，支持区域筛选。",
    approval: "需产线负责人审批",
    nextStatus: "待审批",
    sourceLabel: "已配置版本表格",
    dispatchLabel: "适用于正式发版、安全补丁、问题修复或灰度验证。",
    devices: 6505,
    good: 6503,
    bad: 2,
    centerTargets: 6505,
    filteredOut: 0,
    candidates: 0,
  },
  file: {
    title: "文件导入升级",
    short: "文件导入",
    desc: "上传 CSV / Excel 设备清单，适合批量定向升级。",
    approval: "需产线负责人审批",
    nextStatus: "待审批",
    sourceLabel: "已导入设备清单",
    dispatchLabel: "导入后展示设备总数量，支持重新上传。",
    devices: 1250,
    good: 1182,
    bad: 68,
    centerTargets: 1182,
    filteredOut: 43,
    candidates: 25,
  },
  manual: {
    title: "手动导入升级",
    short: "手动导入",
    desc: "最多 10 台，适合灰度测试或单台处理。",
    approval: "无需审批",
    nextStatus: "待执行",
    sourceLabel: "已配置手动设备列表",
    dispatchLabel: "无需审批，发布后进入待执行。",
    devices: 2,
    good: 2,
    bad: 0,
    centerTargets: 2,
    filteredOut: 0,
    candidates: 0,
  },
};

const routeMeta = {
  "task-list": { title: "任务列表", section: "OTA升级", parent: null },
  "create-task": { title: "新增任务", section: "OTA升级", parent: "task-list" },
  "task-detail": { title: "任务详情", section: "OTA升级", parent: "task-list" },
  "operation-log": { title: "操作日志", section: "日志管理", parent: null },
  "approval-log": { title: "审批日志", section: "日志管理", parent: null },
  "user-list": { title: "用户列表", section: "用户角色", parent: null },
  "user-permission": { title: "权限配置", section: "用户角色", parent: "user-list" },
  "user-detail": { title: "用户详情", section: "用户角色", parent: "user-list" },
  "role-list": { title: "角色权限", section: "用户角色", parent: null },
  "role-permission": { title: "配置权限", section: "用户角色", parent: "role-list" },
  "requirements-doc": { title: "需求说明", section: "产品文档", parent: null },
};

const requirementsMarkdown = "# OTA 升级任务管理优化 PRD\n\n## 01. 本次需求范围\n\n本次需求聚焦 OTA 升级任务从创建到执行复盘的完整业务链路闭环。\n\n| 范围 | 内容 |\n| --- | --- |\n| 新增任务 | 选择升级方式、配置任务内容、预览发布、保存草稿、提交发布 |\n| 升级方式 | 指定版本、文件导入、手动导入 |\n| 跨大区能力 | 当前版本仅指定版本支持跨大区同步下发 |\n| 任务列表 | 状态展示、字段展示、筛选、列设置、分页、状态操作 |\n| 任务详情 | 任务概览、升级明细、异常分类、设备列表、流转明细 |\n| 中国区详情 | 展示中国大区下子节点升级统计 |\n\n## 02. 方案结论\n\n新增任务采用“策略前置”的三步向导：\n\n```text\n选择升级方式 -> 配置任务内容 -> 预览发布\n```\n\n原因是升级方式会决定后续字段、跨大区能力、审批流转、设备数口径和详情展示方式。\n\n| 能力 | 当前版本方案 | 设计原因 |\n| --- | --- | --- |\n| 指定版本 | 支持当前大区，也支持跨大区同步 | 适合正式发版、安全补丁、多大区同策略发布 |\n| 文件导入 | 仅支持当前顶部大区 | 文件清单跨大区拆分和多中心校验复杂，MVP 不做 |\n| 手动导入 | 仅支持当前顶部大区，最多 10 台 | 适合灰度测试和单台处理，跨大区收益低 |\n| 审批 | 指定版本、文件导入需审批；手动导入无需审批 | 在效率和风险控制之间保持 MVP 边界 |\n| 跨大区详情 | 不做多大区汇总详情 | 当前架构按顶部大区查询，不支持跨中心统一汇总 |\n| 中国区详情 | 展示中国子节点统计 | 中国大区包含多个子节点，需要更细颗粒度定位问题 |\n\n关键业务前提：\n\n- 各大区升级包保持一致，不存在跨大区升级包不可用的常规场景。\n- 跨大区同步正常情况下会成功生成各大区本地任务。\n- 系统异常仅作为后台日志和兜底提示，不在 MVP 原型中展开复杂重试流程。\n\n## 03. 创建任务设计\n\n### 3.1 三步向导\n\n| 步骤 | 页面目标 | 关键展示 |\n| --- | --- | --- |\n| 选择升级方式 | 先确定策略分支 | 指定版本 / 文件导入 / 手动导入卡片，展示跨大区、审批、设备数口径 |\n| 配置任务内容 | 按策略动态展示字段 | 基础信息中的任务下发范围 + 当前策略配置项 |\n| 预览发布 | 确认预检与流转 | 任务摘要、预检结果、异常处理、审批规则、下一状态 |\n\n### 3.2 公共字段\n\n| 字段 | 要求 |\n| --- | --- |\n| 任务名称 | 必填，1-64 个字符，不允许只输入空格 |\n| 任务下发范围 | 必选；指定版本可选择当前大区任务或跨大区同步任务；文件导入和手动导入只读展示当前顶部大区 |\n| 目标固件版本 | 必选，只能选择已上架或已生成升级包版本 |\n| 升级包 | 整包 / 差分包 |\n| 任务时间 | 必填，开始时间不得早于当前时间，默认当前时间后 5 分钟 |\n| 任务升级说明 | 必填，1-500 个有效字符，展示字数统计 |\n\n### 3.3 大区选择口径\n\n| 概念 | 用途 | 规则 |\n| --- | --- | --- |\n| 顶部大区 | 系统查询上下文 | 任务列表和任务详情只展示当前顶部大区结果 |\n| 任务范围 | 指定版本的下发类型 | 在基础信息中选择当前大区任务或跨大区同步任务；文件导入和手动导入固定为当前大区任务 |\n| 当前大区执行范围 | 当前大区任务的实际覆盖范围 | 只能在当前顶部大区内选择；中国区可选择全部中国或杭州、杭州低功耗、深圳、成都、上海（宠物）等子节点 |\n| 同步目标大区 | 指定版本跨大区同步的目标范围 | 只选择父级大区：中国 / 香港 / 法兰福克 / 硅谷；选择“中国”代表覆盖全部中国子节点 |\n| 策略条件地区 | 对当前大区执行范围的进一步过滤 | 只能从当前大区执行范围内选择，不能扩大到执行范围之外；当前大区执行范围为“中国全部”时，可继续选择中国子节点作为过滤条件 |\n\n关键规则：\n\n- 顶部大区决定列表、详情和当前大区任务的查询上下文。\n- 任务下发范围放在基础信息中统一决策，升级配置不再二次选择当前大区或跨大区。\n- 指定版本选择当前大区任务时，继续选择当前大区执行范围；不能选择其他顶部大区的数据范围。\n- 指定版本选择跨大区同步任务时，选择同步目标父级大区，并在页面、预览、列表和详情展示“跨大区同步”标签。\n- 文件导入和手动导入仅支持当前顶部大区，任务下发范围展示为只读当前顶部大区。\n- 跨大区同步创建时不选择中国子节点；中国子节点只用于中国当前大区任务范围和详情复盘。\n- 当前大区执行范围选择父级“全部”时，策略条件地区可在该父级大区下继续收窄；若当前大区执行范围已选择具体子节点，策略条件地区只能从这些子节点内选择。\n\n### 3.4 草稿规则\n\n- 选择升级方式后允许保存草稿。\n- 草稿进入列表状态为“待发布”。\n- 待发布任务支持编辑和删除。\n- 草稿再次编辑时回到对应升级方式的配置链路。\n- 切换升级方式时，仅保留公共任务信息，策略私有配置按新方式重新配置。\n\n## 04. 任务状态定义\n\n| 状态 | 触发条件 | 用户关注点 | 操作 |\n| --- | --- | --- | --- |\n| 待发布 | 保存草稿，未提交发布 | 配置是否完整，是否继续编辑 | 编辑、删除 |\n| 待审批 | 指定版本或文件导入提交发布后 | 审批是否通过 | 详情 |\n| 待执行 | 审批通过或手动导入发布成功，未到开始时间 | 执行窗口、目标版本、下发范围 | 详情 |\n| 升级中 | 到达执行时间，任务开始匹配并下发 | 已匹配、成功、失败、异常占比 | 详情、结束任务 |\n| 已完成 | 执行周期结束，或纳入范围设备均已处理 | 最终成功数、失败数、异常原因 | 详情、复制重建 |\n| 已结束 | 用户提前结束任务 | 结束前已处理结果、结束人、结束时间 | 详情、复制重建 |\n| 已驳回 | 审批被驳回 | 驳回原因、审批人 | 详情、复制重建 |\n| 已失效 | 审批超时或任务过了可执行窗口 | 失效原因、失效时间 | 详情、复制重建 |\n\n## 05. 完整生命周期 UML 时序图\n\n```mermaid\nsequenceDiagram\n  participant U as 创建人\n  participant C as 新增任务页\n  participant S as OTA任务服务\n  participant A as 审批系统\n  participant R as 大区中心/边缘\n  participant L as 任务列表\n  participant D as 任务详情\n\n  U->>C: 点击新增任务\n  C-->>U: 展示升级方式选择\n  U->>C: 选择指定版本/文件导入/手动导入\n  C-->>U: 按升级方式展示任务内容配置\n  U->>C: 填写公共字段和策略字段\n\n  alt 保存草稿\n    C->>S: 保存草稿\n    S-->>L: 生成待发布任务\n  else 提交发布\n    C->>C: 校验公共字段和策略字段\n    alt 校验不通过\n      C-->>U: 字段级错误提示\n    else 校验通过\n      C->>S: 发起预检\n      S->>R: 查询版本、设备归属、可升级条件\n      R-->>S: 返回预检结果\n      alt 无可升级对象\n        S-->>C: 返回不可发布\n        C-->>U: 提示无法发布 OTA 升级任务\n      else 存在可升级对象\n        S-->>C: 返回预览发布数据\n        C-->>U: 展示任务摘要、预检结果和下一状态\n        alt 手动导入\n          U->>C: 确认发布\n          C->>S: 创建当前大区任务\n          S-->>L: 任务进入待执行或升级中\n        else 指定版本或文件导入\n          U->>C: 提交审批\n          C->>S: 创建发布单\n          S->>A: 提交审批\n          S-->>L: 任务进入待审批\n        end\n      end\n    end\n  end\n\n  alt 审批驳回\n    A-->>S: 审批驳回\n    S-->>L: 任务更新为已驳回\n  else 审批超时\n    A-->>S: 审批超时\n    S-->>L: 任务更新为已失效\n  else 审批通过\n    A-->>S: 审批通过\n    S-->>L: 任务更新为待执行\n    S->>R: 到达执行时间后下发\n    R-->>S: 任务进入升级中\n    D->>S: 查询升级概览、异常分类、设备列表\n    S->>R: 拉取当前顶部大区执行数据\n    R-->>D: 返回当前大区升级结果\n  end\n\n  alt 用户手动结束\n    U->>D: 点击结束任务\n    D->>S: 二次确认后结束任务\n    S->>R: 停止继续匹配和下发\n    S-->>L: 任务更新为已结束\n  else 周期结束或设备处理完成\n    R-->>S: 返回任务结束结果\n    S-->>L: 任务更新为已完成\n  end\n```\n\n## 06. 指定版本流程\n\n### 6.1 当前大区\n\n```text\n选择指定版本\n -> 配置公共字段\n -> 选择当前大区任务\n -> 选择当前大区执行范围\n -> 选择目标版本和升级包\n -> 勾选源版本表格\n -> 配置全量或批量\n -> 预览发布\n -> 提交审批\n -> 审批通过后按时间窗口执行\n -> 详情展示已匹配、成功、失败和异常分类\n```\n\n关键规则：\n\n- 创建阶段不展示真实设备总数。\n- 全量展示“全量”。\n- 批量展示统一配置的 `N 台`。\n- 执行中展示已匹配数，成功和失败占比按已匹配设备计算。\n\n### 6.2 跨大区同步\n\n```text\n选择指定版本\n -> 在基础信息中选择跨大区同步任务\n -> 勾选同步目标父级大区：中国 / 香港 / 法兰福克 / 硅谷\n -> 配置统一任务信息、目标版本、升级包、源版本范围和数量规则\n -> 统一预览\n -> 提交统一审批\n -> 审批通过后生成各大区本地任务\n -> 用户切换顶部大区查看对应大区任务\n```\n\n关键规则：\n\n- 当前版本仅指定版本支持跨大区同步。\n- 跨大区同步是指定版本的任务下发范围选项，和当前大区任务在基础信息中二选一。\n- 跨大区只选择父级大区，不选择中国子节点。\n- 跨大区同步任务需展示“跨大区同步”标签；列表展示同步批次标识，详情展示同步批次 ID、同步目标大区和当前本地任务大区。\n- 升级包各大区一致，不做大区升级包差异展示。\n- 跨大区批量数量按“每个目标大区各自执行该数量”理解，不做跨大区总量汇总。\n- 任务列表和详情仍按顶部大区查看，不做跨大区统一汇总。\n- 中国区详情展示杭州、杭州低功耗、深圳、成都、上海（宠物）节点统计。\n\n## 07. 文件导入流程\n\n```text\n选择文件导入\n -> 配置公共字段\n -> 上传设备清单\n -> 系统清洗、去重、校验设备\n -> 非当前大区设备进入异常\n -> 版本前三位不一致进入异常\n -> 已是目标版本进入异常\n -> 存在可升级设备时允许预览发布\n -> 提交审批\n -> 审批通过后在当前大区执行\n```\n\n关键规则：\n\n- 文件导入当前不支持跨大区同步。\n- 非当前大区设备进入异常明细，不拆分到其他大区。\n- 文件导入有明确设备清单，因此升级概览展示设备总数、成功数、失败数和未完成数。\n- 支持下载异常明细和导出设备列表。\n\n## 08. 手动导入流程\n\n```text\n选择手动导入\n -> 配置公共字段\n -> 输入设备 ID，最多 10 台\n -> 系统查询设备归属和源版本\n -> 非当前大区设备进入异常\n -> 版本不匹配或已是目标版本进入异常\n -> 存在可升级设备时允许发布\n -> 发布后进入待执行或升级中\n```\n\n关键规则：\n\n- 手动导入当前不支持跨大区同步。\n- 最多 10 台，适合灰度测试或单台处理。\n- 手动导入无需审批。\n- 非当前大区设备提示切换到设备所属大区创建。\n\n## 09. 中国区详情颗粒度流程\n\n```text\n切换顶部大区为中国\n -> 进入任务详情\n -> 查看中国整体升级概览\n -> 查看中国子节点统计\n -> 选择杭州 / 杭州低功耗 / 深圳 / 成都 / 上海（宠物）\n -> 按子节点查看升级概览、异常分类和设备列表\n```\n\n关键规则：\n\n- 跨大区创建时选择“中国”即覆盖全部中国子节点。\n- 当前版本不支持在跨大区任务中细选中国子节点。\n- 子节点用于详情查看和问题定位，不作为跨大区创建范围。\n\n## 10. 列表页承接规则\n\n任务列表只展示当前顶部大区下的任务。来自跨大区同步的任务，在对应大区列表中展示为本地任务，并带同步批次标识。\n\n| 字段 | 展示规则 |\n| --- | --- |\n| 名称 | 展示任务名称 |\n| 任务大区 | 展示当前任务所属大区 |\n| 升级方式 | 指定版本 / 文件导入 / 手动导入 |\n| 升级包 | 整包 / 差分包 |\n| 目标版本 | 展示目标固件版本号 |\n| 升级设备总数 | 指定版本全量展示“全量”；批量、文件导入、手动导入展示 `N 台` |\n| 执行结果 | 展示成功数、失败数和占比 |\n| 任务状态 | 展示状态标签 |\n| 创建人 | 单独一列展示 |\n| 创建时间 | 按最新创建时间倒序排序 |\n| 操作 | 按状态展示可用操作 |\n\n## 11. 详情页承接规则\n\n详情页按“当前顶部大区”展示数据，不展示跨大区统一汇总。\n\n| 模块 | 展示内容 |\n| --- | --- |\n| 顶部任务概览 | 任务名称、状态、任务 ID、创建人、创建时间、目标版本、升级方式、升级包、任务说明 |\n| 当前链路节点 | 当前状态、下一步、流转规则 |\n| 升级明细 | 升级概览、异常分类图表、设备列表、导出设备列表 |\n| 流转明细 | 创建、提交、审批、执行、结束/完成时间线 |\n\n不同策略数据口径：\n\n| 策略 | 详情口径 |\n| --- | --- |\n| 指定版本全量 | 展示已匹配、成功、失败，不展示未知总数百分比 |\n| 指定版本批量 | 展示计划数量、已匹配、成功、失败、剩余匹配名额 |\n| 文件导入 | 展示设备总数、成功、失败、未完成 |\n| 手动导入 | 展示设备总数、成功、失败、未完成 |\n\n## 12. 异常与边界场景\n\n| 场景 | 处理规则 |\n| --- | --- |\n| 未选择升级方式保存草稿 | 不允许保存，提示先选择升级方式 |\n| 保存草稿但必填项未完整 | 允许保存为待发布，提交发布时必须校验完整 |\n| 切换升级方式 | 保留公共任务信息，策略私有配置重新配置 |\n| 提交发布必填项缺失 | 停留当前步骤，展示字段级错误提示 |\n| 过去时间 | 不可选择，默认选中当前时间后 5 分钟 |\n| 任务下发范围 | 指定版本可在基础信息中选择当前大区任务或跨大区同步任务；文件/手动导入只读当前顶部大区 |\n| 当前大区任务选择执行范围 | 只能选择当前顶部大区及子节点，不允许选择其他父级大区 |\n| 跨大区同步选择目标大区 | 只展示父级大区，不展示中国子节点，并展示“跨大区同步”标签 |\n| 策略条件地区 | 只能在当前大区执行范围内进一步收窄，不能扩大执行范围；执行范围为父级全部时可选择其子节点 |\n| 指定版本全量 | 创建阶段不查询真实设备总数，执行中逐步展示已匹配数 |\n| 指定版本批量 | 只支持统一数量；跨大区时每个目标大区各自按该数量执行 |\n| 文件中存在非当前大区设备 | 进入异常明细，不拆分到其他大区 |\n| 手动导入非当前大区设备 | 进入异常，并提示切换设备所属大区创建 |\n| 跨大区系统异常 | 作为系统异常兜底提示和日志记录，不作为产品主流程 |\n| 中国区查看详情 | 展示中国整体和子节点统计 |\n\n## 13. 用户故事\n\n### US-01 创建任务草稿\n\n- **作为** OTA 任务创建人\n- **我希望** 先选择升级方式并保存草稿\n- **以便** 后续从任务列表继续编辑对应策略任务。\n\n验收标准：\n\n- **Given** 用户进入新增任务页\n- **When** 用户选择升级方式并点击保存草稿\n- **Then** 系统生成待发布任务并返回任务列表\n- **And** 待发布任务支持编辑和删除\n\n### US-02 指定版本跨大区同步\n\n- **作为** OTA 任务创建人\n- **我希望** 对多个父级大区使用同一版本策略发起同步任务\n- **以便** 减少重复创建并保证配置一致。\n\n验收标准：\n\n- **Given** 用户选择指定版本\n- **When** 用户选择跨大区同步并勾选目标大区\n- **Then** 系统提交统一审批\n- **And** 审批通过后分别生成各大区本地任务\n- **And** 列表和详情仅展示当前顶部大区结果\n\n### US-03 文件导入发布\n\n- **作为** OTA 任务创建人\n- **我希望** 上传设备清单进行定向升级\n- **以便** 对明确设备集合下发升级任务。\n\n验收标准：\n\n- **Given** 用户选择文件导入\n- **When** 用户上传设备清单\n- **Then** 系统展示导入总数、可升级数和异常数\n- **And** 非当前大区设备进入异常明细\n- **And** 存在可升级设备时允许提交审批\n\n### US-04 手动导入发布\n\n- **作为** OTA 任务创建人\n- **我希望** 手动输入少量设备 ID 并实时校验\n- **以便** 快速完成灰度测试或单台处理。\n\n验收标准：\n\n- **Given** 用户选择手动导入\n- **When** 用户输入设备 ID\n- **Then** 系统展示设备 ID、源版本、所属大区、校验状态和异常说明\n- **And** 设备数量最多 10 台\n- **And** 存在可升级设备时允许发布且无需审批\n\n### US-05 任务详情复盘\n\n- **作为** OTA 任务使用者、产品或研发\n- **我希望** 在详情页集中查看状态、流转、升级结果和异常分类\n- **以便** 判断升级效果并定位异常原因。\n\n验收标准：\n\n- **Given** 用户从列表进入任务详情\n- **When** 用户查看任务概览、升级明细和流转明细\n- **Then** 页面按当前顶部大区展示任务数据\n- **And** 跨大区同步任务展示同步批次提示和中国区子节点统计\n\n## 14. 测试验收标准\n\n### 14.1 新增任务验收\n\n| 验收点 | 标准 |\n| --- | --- |\n| 步骤流程 | 新增任务按选择升级方式、配置任务内容、预览发布三步完成 |\n| 策略前置 | 第一步展示三种升级方式及跨大区、审批、设备数口径差异 |\n| 任务下发范围 | 基础信息中统一展示范围决策；指定版本可选当前大区任务或跨大区同步任务，文件/手动导入只读当前顶部大区 |\n| 大区口径 | 当前大区任务选择当前顶部大区内执行范围；跨大区同步只选择父级目标大区；文件/手动导入执行范围只读当前顶部大区 |\n| 策略条件地区 | 只能基于当前大区执行范围收窄；选择父级全部时可继续选择其子节点，选择具体子节点时不得超出已选子节点 |\n| 必填校验 | 提交发布时校验任务名称、任务下发范围、目标版本、任务时间、任务说明、升级包和策略字段 |\n| 草稿 | 选择升级方式后允许保存草稿，状态为待发布 |\n| 发布结果 | 提交发布后通过弹窗说明当前状态和后续流程 |\n\n### 14.2 策略配置验收\n\n| 升级方式 | 验收点 | 标准 |\n| --- | --- | --- |\n| 指定版本 | 跨大区 | 仅指定版本支持跨大区同步 |\n| 指定版本 | 源版本选择 | 使用表格勾选源版本 |\n| 指定版本 | 全量 | 展示“全量” |\n| 指定版本 | 批量 | 仅支持统一输入数量 |\n| 文件导入 | 上传后 | 展示文件名、上传完成状态、导入总数、可升级数、异常数 |\n| 文件导入 | 异常 | 非当前大区设备进入异常明细 |\n| 手动导入 | 数量 | 最多 10 台 |\n| 手动导入 | 审批 | 无需审批，发布后进入待执行或升级中 |\n\n### 14.3 详情页验收\n\n| 验收点 | 标准 |\n| --- | --- |\n| 当前链路节点 | 展示当前状态、下一步和流转规则 |\n| 顶部任务概览 | 展示任务名称、状态、任务 ID、创建人、时间、目标版本、方式、升级包、说明 |\n| 升级明细 | 展示升级概览、异常分类图表、设备列表 |\n| 跨大区提示 | 提示当前仅展示顶部大区结果 |\n| 中国区详情 | 展示中国整体和子节点统计 |\n\n## 15. 原型自测清单\n\n| 自测类型 | 检查内容 |\n| --- | --- |\n| 代码可用性 | `app.js` 无语法错误，页面入口可加载 |\n| 文案覆盖 | 原型包含关键状态、升级方式、字段名称和异常提示 |\n| 交互覆盖 | 新增任务、保存草稿、发布弹窗、列表筛选、详情切换、导出、结束任务均有交互 |\n| 状态覆盖 | 待发布、待审批、待执行、升级中、已完成、已结束、已驳回、已失效均可展示 |\n| 策略覆盖 | 指定版本、文件导入、手动导入均可切换查看 |\n| 跨大区覆盖 | 指定版本可体现跨大区同步；文件/手动不支持跨大区 |\n| 响应式覆盖 | 大屏、中屏、小屏下表单、列表、详情无明显溢出 |\n";

let uploadTimers = [];

const now = new Date();
const defaultStartAt = addMinutes(now, 5);
const defaultEndAt = addDays(defaultStartAt, state.quickRangeDays);
state.taskStartAt = formatDateTime(defaultStartAt);
state.taskEndAt = formatDateTime(defaultEndAt);

const initialRoute = window.location.hash.slice(1);
if (routeMeta[initialRoute]) {
  state.route = initialRoute;
  if (initialRoute === "create-task") syncCreateRoute();
}

function icon(name, className = "") {
  return `<svg class="icon ${className}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatDateTime(date) {
  return `${formatDate(date)} ${formatTime(date)}`;
}

function parseDateTime(value) {
  const [date = "", time = "00:00:00"] = value.split(" ");
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute, second] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour || 0, minute || 0, second || 0);
}

function setRoute(route) {
  const previousRoute = state.route;
  state.route = route;
  if (route === "create-task") {
    syncCreateRoute();
    if (previousRoute !== "create-task" && !state.editingDraft) resetCreateTaskState();
  }
  if (route !== "create-task") state.editingDraft = false;
  window.history.replaceState(null, "", `#${route}`);
  render({ preserveScroll: false });
}

function resetCreateTaskState() {
  clearUploadTimers();
  const start = addMinutes(new Date(), 5);
  state.topRegion = "中国";
  state.packageType = "whole";
  state.strategy = "version";
  state.taskScope = "current";
  state.syncRegions = ["中国", "香港"];
  state.previewScenario = "mixed";
  state.quantityMode = "full";
  state.batchQuantity = 0;
  state.createStep = 1;
  state.conditionRegionEnabled = false;
  state.regionOperator = "等于";
  state.quickRangeDays = 7;
  state.taskStartAt = formatDateTime(start);
  state.taskEndAt = formatDateTime(addDays(start, 7));
  state.form = {
    taskName: "IPC-杭州低功耗_安全补丁升级",
    targetVersion: "23.422.209.17",
    upgradeDesc: "修复低功耗设备夜间唤醒异常，按杭州低功耗大区灰度发布。",
  };
  state.errors = {};
  state.selectedRegions = ["中国 / 杭州低功耗", "中国 / 杭州"];
  state.conditionRegions = ["中国 / 杭州低功耗"];
  state.selectedVersions = ["23.422.208.91", "23.110.105.46", "23.110.105.43", "10.176.42"];
  state.manualDevices = [
    { id: 1, deviceId: "IPC-HZ-LP-000128", version: "23.110.105.46", region: "杭州低功耗", status: "可升级", error: "" },
    { id: 2, deviceId: "IPC-HZ-LP-000129", version: "23.110.105.43", region: "杭州低功耗", status: "可升级", error: "" },
  ];
  state.manualNextId = 3;
  state.fileUploaded = false;
  state.fileUploadStatus = "idle";
  state.uploadProgress = 0;
  state.uploadFileName = "";
  state.uploadDeviceCount = 0;
  state.regionDropdownOpen = false;
  state.conditionRegionDropdownOpen = false;
  state.regionOperatorOpen = false;
  state.datePickerOpen = false;
}

function snapshotDraftTask() {
  return {
    savedAt: formatDateTime(new Date()),
    createStep: state.createStep,
    topRegion: state.topRegion,
    packageType: state.packageType,
    strategy: state.strategy,
    taskScope: state.taskScope,
    syncRegions: [...state.syncRegions],
    previewScenario: state.previewScenario,
    quantityMode: state.quantityMode,
    batchQuantity: state.batchQuantity,
    conditionRegionEnabled: state.conditionRegionEnabled,
    regionOperator: state.regionOperator,
    quickRangeDays: state.quickRangeDays,
    taskStartAt: state.taskStartAt,
    taskEndAt: state.taskEndAt,
    form: { ...state.form },
    selectedRegions: [...state.selectedRegions],
    conditionRegions: [...state.conditionRegions],
    selectedVersions: [...state.selectedVersions],
    manualDevices: state.manualDevices.map(device => ({ ...device })),
    manualNextId: state.manualNextId,
    fileUploaded: state.fileUploaded,
    fileUploadStatus: state.fileUploadStatus,
    uploadProgress: state.uploadProgress,
    uploadFileName: state.uploadFileName,
    uploadDeviceCount: state.uploadDeviceCount,
  };
}

function restoreDraftTask() {
  const draft = state.draftTask;
  if (!draft) {
    showToast("暂无可编辑草稿");
    return;
  }
  clearUploadTimers();
  state.createStep = Math.min(draft.createStep || 1, 3);
  state.topRegion = draft.topRegion || "中国";
  state.packageType = draft.packageType;
  state.strategy = draft.strategy;
  state.taskScope = draft.taskScope || "current";
  state.syncRegions = draft.syncRegions?.length ? [...draft.syncRegions] : ["中国", "香港"];
  state.previewScenario = draft.previewScenario;
  state.quantityMode = draft.quantityMode;
  state.batchQuantity = draft.batchQuantity;
  state.conditionRegionEnabled = draft.conditionRegionEnabled;
  state.regionOperator = draft.regionOperator;
  state.quickRangeDays = draft.quickRangeDays;
  state.taskStartAt = draft.taskStartAt;
  state.taskEndAt = draft.taskEndAt;
  state.form = { ...draft.form };
  state.selectedRegions = [...draft.selectedRegions];
  state.conditionRegions = draft.conditionRegions?.length ? [...draft.conditionRegions] : [...state.selectedRegions];
  state.selectedVersions = [...draft.selectedVersions];
  state.manualDevices = draft.manualDevices.map(device => ({ ...device }));
  state.manualNextId = draft.manualNextId;
  state.fileUploaded = draft.fileUploaded;
  state.fileUploadStatus = draft.fileUploadStatus;
  state.uploadProgress = draft.uploadProgress;
  state.uploadFileName = draft.uploadFileName;
  state.uploadDeviceCount = draft.uploadDeviceCount;
  state.errors = {};
  state.regionDropdownOpen = false;
  state.conditionRegionDropdownOpen = false;
  state.regionOperatorOpen = false;
  state.datePickerOpen = false;
  sanitizeRegionState();
  state.editingDraft = true;
  setRoute("create-task");
}

function clearUploadTimers() {
  uploadTimers.forEach(timer => window.clearTimeout(timer));
  uploadTimers = [];
}

function currentRegionScopeOptions() {
  return regionScopeOptionsByTopRegion[state.topRegion] || [`${state.topRegion}全部`];
}

function topRegionAllScope() {
  return currentRegionScopeOptions()[0];
}

function isAllRegionScope(region) {
  return String(region || "").endsWith("全部");
}

function selectableExecutionRegions() {
  const options = currentRegionScopeOptions();
  const childOptions = options.filter(region => !isAllRegionScope(region));
  return childOptions.length ? childOptions : options;
}

function isSyncCreateTask() {
  return state.strategy === "version" && state.taskScope === "sync";
}

function isFixedCurrentRegionStrategy() {
  return state.strategy === "file" || state.strategy === "manual";
}

function availableConditionRegions() {
  if (isSyncCreateTask()) return [];
  const scopeOptions = currentRegionScopeOptions();
  const childOptions = scopeOptions.filter(region => !isAllRegionScope(region));
  if (isFixedCurrentRegionStrategy()) {
    return childOptions.length ? childOptions : scopeOptions;
  }
  const selectedSet = new Set(state.selectedRegions);
  if (selectedSet.has(topRegionAllScope())) {
    return childOptions.length ? childOptions : [topRegionAllScope()];
  }
  return scopeOptions.filter(region => selectedSet.has(region) && (!isAllRegionScope(region) || !childOptions.length));
}

function sanitizeRegionState(options = {}) {
  const preserveEmpty = Boolean(options.preserveEmpty);
  const scopeOptions = currentRegionScopeOptions();
  state.selectedRegions = state.selectedRegions.filter(region => scopeOptions.includes(region));
  if (!state.selectedRegions.length && !preserveEmpty) state.selectedRegions = [scopeOptions[0]];
  const conditionOptions = availableConditionRegions();
  state.conditionRegions = (state.conditionRegions || []).filter(region => conditionOptions.includes(region));
  if (state.conditionRegionEnabled && !state.conditionRegions.length && conditionOptions.length) {
    state.conditionRegions = [conditionOptions[0]];
  }
}

function currentExecutionRegions() {
  if (isSyncCreateTask()) return state.syncRegions;
  if (isFixedCurrentRegionStrategy()) return [state.topRegion];
  return state.selectedRegions;
}

function regionTopName(region) {
  const normalized = String(region || "").replace(/\s+/g, "");
  if (normalized.startsWith("中国")) return "中国";
  if (normalized.startsWith("香港")) return "香港";
  if (normalized.startsWith("法兰福克")) return "法兰福克";
  if (normalized.startsWith("硅谷")) return "硅谷";
  return "";
}

function taskBelongsToTopRegion(task) {
  if (task.syncRegions?.length) return task.syncRegions.includes(state.topRegion);
  return (task.topRegion || regionTopName(task.region)) === state.topRegion;
}

function renderMiniRegionTags(regions) {
  return regions.length
    ? regions.map(region => `<span class="mini-tag blue">${escapeHtml(region)}</span>`).join("")
    : "-";
}

function simulateFileUpload() {
  clearUploadTimers();
  state.fileUploaded = true;
  state.fileUploadStatus = "uploading";
  state.uploadProgress = 36;
  state.uploadFileName = "20.121.102.29.csv";
  state.uploadDeviceCount = 72;
  render();

  uploadTimers.push(window.setTimeout(() => {
    state.uploadProgress = 78;
    render();
  }, 420));

  uploadTimers.push(window.setTimeout(() => {
    state.fileUploadStatus = "checking";
    state.uploadProgress = 100;
    render();
  }, 860));

  uploadTimers.push(window.setTimeout(() => {
    state.fileUploadStatus = "uploaded";
    delete state.errors.fileUpload;
    showToast("设备清单已上传，共识别 72 台设备");
    render();
  }, 1420));
}

function syncCreateRoute() {
  const key = `${state.packageType}-${state.strategy}`;
  const presets = {
    "whole-version": ["whole", "version"],
    "whole-file": ["whole", "file"],
    "whole-manual": ["whole", "manual"],
    "diff-version": ["diff", "version"],
    "diff-file": ["diff", "file"],
    "diff-manual": ["diff", "manual"],
  };
  return presets[key] || ["whole", "version"];
}

function openModal(type, data = {}) {
  state.modal = { type, ...data };
  renderPortal();
}

function closeModal() {
  state.modal = null;
  renderPortal();
}

function showToast(message) {
  state.toast = message;
  renderPortal();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    renderPortal();
  }, 2800);
}

function routeForActive() {
  if (state.route === "create-task" || state.route === "task-detail") return "task-list";
  if (state.route === "user-permission" || state.route === "user-detail") return "user-list";
  if (state.route === "role-permission") return "role-list";
  return state.route;
}

function render(options = {}) {
  const preserveScroll = options.preserveScroll !== false;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const focusSelector = options.focusSelector;
  const focusSelectionStart = options.focusSelectionStart;
  const app = document.getElementById("app");
  disposeExceptionCharts(app);
  app.innerHTML = `
    ${renderTopbar()}
    <div class="layout">
      ${renderSidebar()}
      <main id="mainContent" class="main ${state.route === "role-list" || state.route === "role-permission" ? "blue-zone" : ""}" tabindex="-1">
        ${renderPage()}
      </main>
    </div>
    ${renderRequirementDock()}
  `;
  bindEvents(app);
  initExceptionCharts(app);
  renderPortal();
  window.requestAnimationFrame(() => {
    if (preserveScroll) {
      window.scrollTo(scrollX, scrollY);
    } else {
      window.scrollTo(0, 0);
    }
    if (!focusSelector) return;
    const focusTarget = app.querySelector(focusSelector);
    if (!focusTarget) return;
    focusTarget.focus({ preventScroll: true });
    if (typeof focusSelectionStart === "number" && typeof focusTarget.setSelectionRange === "function") {
      focusTarget.setSelectionRange(focusSelectionStart, focusSelectionStart);
    }
  });
}

function initExceptionCharts(root) {
  if (!window.echarts) return;
  root.querySelectorAll("[data-exception-chart]").forEach(el => {
    const rows = JSON.parse(el.dataset.exceptionChart || "[]");
    if (!rows.length) return;
    const total = rows.reduce((sum, row) => sum + Number(row.count || 0), 0);
    const chart = window.echarts.init(el);
    chart.setOption({
      color: rows.map(row => exceptionToneColor(row.tone)),
      tooltip: {
        trigger: "item",
        confine: true,
        appendToBody: true,
        backgroundColor: "#fff",
        borderColor: "#b9d8f1",
        borderWidth: 1,
        padding: [8, 10],
        textStyle: { color: "#5f6b7d", fontSize: 12 },
        formatter: params => {
          const value = Number(params.value || 0).toLocaleString();
          const percent = Number(params.percent || 0).toFixed(1);
          return `<div style="font-weight:700;margin-bottom:6px">异常分类</div><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${params.color};margin-right:7px"></span>${params.name} <b>${value} 台</b> <b>${percent}%</b>`;
        },
      },
      series: [{
        type: "pie",
        radius: ["60%", "84%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false },
        labelLine: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 6,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetY: 3,
            shadowColor: "rgba(20, 46, 92, 0.14)",
          },
        },
        data: rows.map(row => ({
          name: row.label,
          value: row.count,
          tone: row.tone,
        })),
      }],
    });
    chart.on("mouseover", params => focusExceptionByIndex(el, params.dataIndex, rows, total));
    chart.on("mouseout", () => resetExceptionChartFocus(el));
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => chart.resize());
      resizeObserver.observe(el);
      el.__resizeObserver = resizeObserver;
    }
    el.__chart = chart;
  });
}

function disposeExceptionCharts(root) {
  root.querySelectorAll("[data-exception-chart]").forEach(el => {
    el.__resizeObserver?.disconnect();
    el.__chart?.dispose();
  });
}

function exceptionToneColor(tone) {
  return {
    red: "#e54855",
    orange: "#ff7a1a",
    blue: "#1f6bff",
    purple: "#7c3aed",
    cyan: "#06b6d4",
    gray: "#64748b",
  }[tone] || "#ff7a1a";
}

function renderRequirementDock() {
  if (!["task-list", "create-task", "task-detail"].includes(state.route)) return "";
  return `
    <div class="requirement-dock-group">
      <button class="requirement-dock ${state.showRequirementNotes ? "active" : ""}" type="button" data-action="toggle-requirement-notes" aria-pressed="${state.showRequirementNotes}">
        ${icon("info")}
        <span>需求标注${state.showRequirementNotes ? "开" : "关"}</span>
      </button>
    </div>
  `;
}

function renderRequirementsDocPage() {
  const slides = parsePresentationSlides(requirementsMarkdown);
  return `
    <section class="page requirements-page prd-doc-shell">
      <header class="prd-doc-header">
        <div>
          <span>产品需求文档</span>
          <h1>OTA 升级任务管理优化方案</h1>
          <p>按业务链路、用户故事和验收标准组织内容，便于产品评审、研发理解和测试自测。</p>
        </div>
        <button class="btn" type="button" data-route="task-list">返回任务列表</button>
      </header>
      <section class="prd-deck-layout">
        <aside class="prd-slide-index" aria-label="需求说明页码导航">
          ${slides.map((slide, index) => `
            <a href="#prd-slide-${index + 1}">
              <em>${String(index + 1).padStart(2, "0")}</em>
              <span>${escapeHtml(slide.title.replace(/^\d+\.\s*/, ""))}</span>
            </a>
          `).join("")}
        </aside>
        <div class="prd-slide-stack">
          ${slides.map((slide, index) => `
            <article class="prd-slide-card" id="prd-slide-${index + 1}">
              <div class="prd-slide-kicker">PAGE ${String(index + 1).padStart(2, "0")}</div>
              <h2>${formatInlineMarkdown(slide.title)}</h2>
              <div class="prd-slide-body">
                ${renderMarkdownHtml(slide.body)}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    </section>
  `;
}

function parsePresentationSlides(markdown) {
  const lines = markdown.split(/\r?\n/);
  const slides = [];
  let deckTitle = "";
  let current = null;

  lines.forEach(line => {
    const h1 = line.match(/^#\s+(.+)$/);
    if (h1) {
      deckTitle = h1[1];
      return;
    }
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      if (current) slides.push(current);
      current = { title: h2[1], bodyLines: [] };
      return;
    }
    if (current) current.bodyLines.push(line);
  });
  if (current) slides.push(current);
  if (!slides.length) return [{ title: deckTitle || "需求说明", body: markdown }];
  return slides.map(slide => ({
    title: slide.title,
    body: slide.bodyLines.join("\n").trim(),
  }));
}

function renderMarkdownHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inCode = false;
  let codeLines = [];
  let inList = false;
  let inTable = false;
  let tableRows = [];

  const closeList = () => {
    if (!inList) return;
    html.push("</ul>");
    inList = false;
  };
  const flushTable = () => {
    if (!inTable) return;
    const rows = tableRows.filter(row => !/^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(row));
    if (rows.length) {
      html.push("<div class=\"doc-table-wrap\"><table>");
      rows.forEach((row, index) => {
        const cells = row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(cell => cell.trim());
        const tag = index === 0 ? "th" : "td";
        html.push(`<tr>${cells.map(cell => `<${tag}>${formatInlineMarkdown(cell)}</${tag}>`).join("")}</tr>`);
      });
      html.push("</table></div>");
    }
    tableRows = [];
    inTable = false;
  };

  lines.forEach(line => {
    if (line.startsWith("```")) {
      flushTable();
      closeList();
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      return;
    }
    if (inCode) {
      codeLines.push(line);
      return;
    }
    if (/^\s*\|.*\|\s*$/.test(line)) {
      closeList();
      inTable = true;
      tableRows.push(line);
      return;
    }
    flushTable();
    if (!line.trim()) {
      closeList();
      return;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${formatInlineMarkdown(heading[2])}</h${level}>`);
      return;
    }
    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      closeList();
      html.push(`<blockquote><p>${formatInlineMarkdown(quote[1])}</p></blockquote>`);
      return;
    }
    const listItem = line.match(/^\s*-\s+(.+)$/);
    if (listItem) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${formatInlineMarkdown(listItem[1])}</li>`);
      return;
    }
    closeList();
    html.push(`<p>${formatInlineMarkdown(line)}</p>`);
  });
  flushTable();
  closeList();
  if (inCode) html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  return html.join("");
}

function formatInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderRequirementNote(section, title, items) {
  if (!state.showRequirementNotes) return "";
  const body = items.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  return `
    <span class="requirement-pin" tabindex="0" aria-label="${escapeHtml(section)} ${escapeHtml(title)}">
      <i>需</i>
      <span class="requirement-popover" role="note">
        <span class="requirement-popover-head"><em>${escapeHtml(section)}</em><strong>${escapeHtml(title)}</strong></span>
        <ul>${body}</ul>
      </span>
    </span>
  `;
}

function renderTopbar() {
  return `
    <header class="topbar">
      <button class="hamburger" type="button" data-action="toggle-all-nav" aria-label="收起或展开菜单">${icon("menu")}</button>
      <div class="brand">
        <span class="brand-mark">${icon("shield")}</span>
        <span>运维系统</span>
      </div>
      <div class="topbar-spacer"></div>
      <span class="region-label">当前大区：</span>
      <button class="region-picker menu-button" type="button" data-action="open-region">
        <span>${state.topRegion}</span>${icon("chevron")}
      </button>
      <span class="system-link">${icon("layer")}系统管理</span>
      <span class="avatar-name"><span class="avatar" aria-hidden="true"></span><span>汤彦珊</span></span>
    </header>
  `;
}

function renderSidebar() {
  const active = routeForActive();
  return `
    <aside class="sidebar" aria-label="主菜单">
      <h1 class="sidebar-title">OTA升级系统</h1>
      <div class="sidebar-main-nav">
        ${navGroups.map(group => navSection(group.key, group.title, group.icon, group.items, active)).join("")}
      </div>
      <div class="sidebar-doc-nav">
        ${docNavItems.map(([route, label]) => `
          <button class="nav-item doc-nav-item ${active === route ? "active" : ""}" type="button" data-route="${route}">
            ${icon("log")}${label}
          </button>
        `).join("")}
      </div>
    </aside>
  `;
}

function navSection(key, title, iconName, items, active) {
  const collapsed = state.navCollapsed[key];
  return `
    <section class="nav-section ${collapsed ? "collapsed" : ""}">
      <button class="nav-parent" type="button" data-action="toggle-nav" data-key="${key}" aria-expanded="${!collapsed}">
        ${icon(iconName)}
        <span>${title}</span>
        ${icon("chevron", "chev")}
      </button>
      <div class="nav-children">
        ${items.map(([route, label]) => `
          <button class="nav-item ${active === route ? "active" : ""}" type="button" data-route="${route}">
            ${label}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPage() {
  switch (state.route) {
    case "task-list":
      return renderTaskList();
    case "create-task":
      return renderCreateTask();
    case "task-detail":
      return renderTaskDetail();
    case "operation-log":
      return renderLogPage("操作日志", operationLogs);
    case "approval-log":
      return renderApprovalLog();
    case "user-list":
      return renderUserList();
    case "user-permission":
      return renderUserPermission();
    case "user-detail":
      return renderUserDetail();
    case "role-list":
      return renderRolePage(false);
    case "role-permission":
      return renderRolePage(true);
    case "requirements-doc":
      return renderRequirementsDocPage();
    default:
      return renderTaskList();
  }
}

function renderPageHeader(title, options = {}) {
  const back = options.back ? `<button class="back-btn" type="button" data-route="${options.back}" aria-label="返回">${icon("back")}</button>` : "";
  const actions = options.actions || "";
  return `
    <div class="page-heading">
      ${renderBreadcrumb()}
      <div class="page-header">
        <div class="title-stack">
          ${back}
          <h2 class="page-title">${title}</h2>
        </div>
        <div class="page-actions">${actions}</div>
      </div>
    </div>
  `;
}

function renderBreadcrumb() {
  const meta = routeMeta[state.route] || routeMeta["task-list"];
  const parent = meta.parent ? routeMeta[meta.parent] : null;
  const crumbs = [
    { label: meta.section, route: parent ? meta.parent : state.route },
    parent ? { label: parent.title, route: meta.parent } : null,
    { label: meta.title, route: state.route, current: true },
  ].filter(Boolean);

  return `
    <nav class="breadcrumb" aria-label="当前位置">
      ${crumbs.map((crumb, index) => `
        ${index > 0 ? `<span class="breadcrumb-separator">/</span>` : ""}
        ${crumb.current
          ? `<span aria-current="page">${crumb.label}</span>`
          : `<button class="breadcrumb-link" type="button" data-route="${crumb.route}">${crumb.label}</button>`}
      `).join("")}
    </nav>
  `;
}

function renderTaskList() {
  const rows = sortedTaskListRows();
  const total = rows.length;
  const pages = Math.max(Math.ceil(total / state.taskPageSize), 1);
  state.taskPage = Math.min(Math.max(state.taskPage, 1), pages);
  const pageStart = (state.taskPage - 1) * state.taskPageSize;
  const visibleRows = rows.slice(pageStart, pageStart + state.taskPageSize);
  const columnCount = visibleTaskColumnCount() + 3;
  return `
    <section class="page">
      <div class="annotated-block">
        ${renderTaskListHero()}
        ${renderRequirementNote("PRD 01 / 10", "本次范围与状态统计", [
          "原型覆盖新增任务、任务列表、任务详情、升级统计口径、异常分类和模拟验证。",
          "状态统计只统计当前顶部大区，不做跨大区聚合查询。",
        ])}
      </div>
      <div class="annotated-block">
        ${renderTaskAreaStats()}
        ${renderRequirementNote("PRD 10", "状态统计卡片", [
          "展示当前任务大区和基础状态数量。",
          "待发布、待审批、升级中、已完成等状态需与列表筛选口径一致。",
        ])}
      </div>
      <div class="annotated-block">
        ${renderTaskFilters()}
        ${renderRequirementNote("PRD 10", "列表查询条件", [
          "查询条件顺序：任务名称、任务状态、升级方式、升级包、创建人、创建时间。",
          "筛选变更后列表重置到第一页，创建人支持输入和候选选择。",
        ])}
      </div>
      <div class="annotated-block">
        ${renderTaskTableToolbar()}
        ${renderRequirementNote("PRD 10", "列表字段与状态操作", [
          "列表默认按创建时间倒序，不展示更新时间。",
          "升级设备数统一展示 N 台或全量，非执行态执行结果展示 -。",
          "操作规则：待发布编辑/删除，升级中详情/结束任务，已驳回和已失效详情/复制重建。",
        ])}
        <div class="table-wrap">
          <table class="task-table ${state.taskCompact ? "compact" : ""}">
            <thead>
              <tr>
                <th style="width: 210px">任务名称</th>
                ${renderTaskColumnHeaders()}
                <th style="width: 110px">任务状态 ${icon("chevron")}</th>
                <th class="sticky-action-col" style="width: 150px">操作</th>
              </tr>
            </thead>
            <tbody>
              ${visibleRows.length
                ? visibleRows.map(renderTaskListRow).join("")
                : `<tr class="empty-row"><td colspan="${columnCount}">暂无符合条件的任务</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
      ${pagination(total, pages, { page: state.taskPage, pageSize: state.taskPageSize, scope: "task" })}
    </section>
  `;
}

function renderTaskListHero() {
  return `
    <div class="task-list-hero">
      <div class="task-list-hero-copy">
        ${renderBreadcrumb()}
        <h2>OTA升级</h2>
        <p>为物联网设备提供稳定、高并发、安全的远程升级任务管理能力，支持版本灰度、定向升级和执行监控。</p>
      </div>
      <div class="task-list-hero-art" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
}

function renderTaskAreaStats() {
  const rows = taskRowsForStats();
  const count = status => rows.filter(row => row.status === status).length;
  const total = rows.filter(row => row.status !== "待发布").length;
  const stats = [
    ["当前大区", state.topRegion, "home"],
    ["任务总数", total, "layer"],
    ["待发布", count("待发布"), "log"],
    ["待审批", count("待审批"), "clock"],
    ["升级中", count("升级中"), "refresh"],
    ["已完成", count("已完成"), "check"],
  ];
  return `
    <div class="task-stats">
      ${stats.map(([label, value, iconName], index) => `
        <div class="task-stat-card ${index === 0 ? "area-card" : ""}">
          <i>${icon(iconName)}</i>
          <div>
            <span>${label}</span>
            <strong>${value}</strong>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function taskRowsForStats() {
  const draft = state.draftTask && taskBelongsToTopRegion(draftTaskAsRow()) ? [{ status: "待发布" }] : [];
  return [...draft, ...taskListRows.filter(taskBelongsToTopRegion)];
}

function renderTaskFilters() {
  const filters = state.taskFilters;
  return `
    <div class="task-filter-panel">
      <div class="task-filter-grid">
        <label class="filter-field filter-keyword">
          <span>任务名称</span>
          <span class="field-control task-search">
            ${icon("search")}
            <input type="search" value="${escapeHtml(filters.keyword)}" placeholder="请输入任务名称" aria-label="任务名称" data-task-filter="keyword" />
          </span>
        </label>
        <label class="filter-field">
          <span>任务状态</span>
          <span class="field-control">
            <select aria-label="任务状态" data-task-filter="status">
              ${renderOptions(taskStatusOptions, filters.status)}
            </select>
          </span>
        </label>
        <label class="filter-field">
          <span>升级方式</span>
          <span class="field-control">
            <select aria-label="升级方式" data-task-filter="method">
              ${renderOptions(taskMethodOptions, filters.method)}
            </select>
          </span>
        </label>
        <label class="filter-field">
          <span>升级包</span>
          <span class="field-control">
            <select aria-label="升级包" data-task-filter="packageType">
              ${renderOptions(taskPackageOptions, filters.packageType)}
            </select>
          </span>
        </label>
        <div class="filter-field filter-combobox ${state.taskCreatorDropdownOpen ? "open" : ""}" data-stop>
          <span>创建人</span>
          <span class="field-control">
            <input type="text" value="${escapeHtml(filters.creator)}" placeholder="输入创建人搜索" aria-label="创建人" autocomplete="off" data-task-filter="creator" />
            <button class="combo-trigger" type="button" data-action="${filters.creator ? "clear-creator-filter" : "toggle-creator-filter"}" aria-label="${filters.creator ? "清空创建人" : "展开创建人"}">${filters.creator ? icon("close") : icon("chevron")}</button>
          </span>
          ${renderCreatorFilterMenu()}
        </div>
        <label class="filter-field filter-created-time">
          <span>创建时间</span>
          <span class="field-control date-field">
            ${icon("clock")}
            <input type="date" value="${escapeHtml(filters.createdDate)}" aria-label="创建时间" data-task-filter="createdDate" />
          </span>
        </label>
        <div class="filter-actions">
          <button class="btn primary" type="button" data-action="query">查询</button>
          <button class="btn" type="button" data-action="reset">重置</button>
        </div>
      </div>
    </div>
  `;
}

function renderOptions(options, selected) {
  return options.map(option => `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`).join("");
}

function renderCreatorFilterMenu() {
  if (!state.taskCreatorDropdownOpen) return "";
  const keyword = normalizeText(state.taskFilters.creator);
  const creators = taskCreatorOptions().filter(creator => !keyword || normalizeText(creator).includes(keyword));
  return `
    <div class="filter-combobox-menu">
      <button class="filter-option ${state.taskFilters.creator ? "" : "active"}" type="button" data-action="select-creator-filter" data-creator="">全部创建人</button>
      ${creators.length
        ? creators.map(creator => `
            <button class="filter-option ${state.taskFilters.creator === creator ? "active" : ""}" type="button" data-action="select-creator-filter" data-creator="${escapeHtml(creator)}">${escapeHtml(creator)}</button>
          `).join("")
        : `<span class="filter-empty">无匹配创建人</span>`}
    </div>
  `;
}

function renderTaskTableToolbar() {
  return `
    <div class="table-toolbar">
      <div>
        <strong>任务记录</strong>
      </div>
      <div class="table-tools">
        <button class="icon-tool-btn ${state.taskCompact ? "active" : ""}" type="button" data-action="toggle-task-compact" aria-label="紧凑显示" title="紧凑">${icon("sliders")}</button>
        <div class="column-settings-wrap">
          <button class="icon-tool-btn" type="button" data-action="toggle-column-settings" aria-label="列设置" title="列设置">${icon("settings")}</button>
          ${state.columnSettingsOpen ? renderColumnSettingsPanel() : ""}
        </div>
        <button class="icon-tool-btn" type="button" data-action="refresh-task-list" aria-label="刷新任务列表" title="刷新">${icon("refresh")}</button>
        <button class="btn primary table-create-btn" type="button" data-route="create-task">${icon("plus")}新增任务</button>
      </div>
    </div>
  `;
}

function renderColumnSettingsPanel() {
  return `
    <div class="column-settings-panel" data-stop>
      <strong>列设置</strong>
      ${taskColumnOptions.map(([key, label]) => `
        <label class="checkbox-line">
          <input type="checkbox" ${state.visibleTaskColumns[key] ? "checked" : ""} data-action="toggle-task-column" data-column="${key}" />
          ${label}
        </label>
      `).join("")}
      <div class="column-settings-actions">
        <button class="link-btn" type="button" data-action="reset-task-columns">恢复默认</button>
        <button class="btn primary" type="button" data-action="save-task-columns">保存设置</button>
      </div>
    </div>
  `;
}

function renderTaskColumnHeaders() {
  const headerMap = {
    method: `<th style="width: 120px">升级方式</th>`,
    packageType: `<th style="width: 100px">升级包</th>`,
    targetVersion: `<th style="width: 140px">目标版本</th>`,
    total: `<th style="width: 140px">升级规模</th>`,
    time: `<th style="width: 240px">任务时间</th>`,
    result: `<th style="width: 180px">执行结果</th>`,
    region: `<th style="width: 190px">任务所属大区</th>`,
    creator: `<th style="width: 110px">创建人</th>`,
    createdAt: `<th style="width: 170px">创建时间</th>`,
  };
  return taskColumnOptions.map(([key]) => state.visibleTaskColumns[key] ? headerMap[key] : "").join("");
}

function visibleTaskColumnCount() {
  return taskColumnOptions.filter(([key]) => state.visibleTaskColumns[key]).length;
}

function sortedTaskListRows() {
  return taskRowsWithDraft()
    .filter(taskBelongsToTopRegion)
    .filter(taskMatchesFilters)
    .sort((a, b) => parseDateTime(b.createdAt) - parseDateTime(a.createdAt));
}

function taskRowsWithDraft() {
  const rows = [...taskListRows];
  if (state.draftTask) rows.push(draftTaskAsRow());
  return rows;
}

function draftTaskAsRow() {
  const draft = state.draftTask;
  const packageLabel = draft.packageType === "whole" ? "整包" : "差分包";
  const isSync = draft.strategy === "version" && draft.taskScope === "sync";
  const regions = isSync
    ? `同步目标：${draft.syncRegions?.length ? draft.syncRegions.join("、") : "-"}`
    : ["file", "manual"].includes(draft.strategy)
      ? (draft.topRegion || state.topRegion)
      : (draft.selectedRegions?.length ? draft.selectedRegions.join("、") : "-");
  const taskTime = draft.taskStartAt && draft.taskEndAt ? `${draft.taskStartAt}~${draft.taskEndAt}` : "-";
  return {
    id: draft.id || "DRAFT",
    name: draft.form.taskName || "未命名草稿",
    method: strategyMethodLabel(draft.strategy),
    packageType: packageLabel,
    targetVersion: draft.form.targetVersion || "-",
    total: "-",
    time: taskTime,
    result: null,
    region: regions,
    status: "待发布",
    creator: "汤彦珊",
    createdAt: draft.savedAt,
    topRegion: draft.topRegion || state.topRegion,
    syncRegions: isSync ? [...(draft.syncRegions || [])] : null,
    isDraft: true,
  };
}

function taskMatchesFilters(task) {
  const filters = state.taskFilters;
  const keyword = normalizeText(filters.keyword);
  if (keyword) {
    if (!normalizeText(task.name).includes(keyword)) return false;
  }
  if (filters.status !== "全部" && task.status !== filters.status) return false;
  if (filters.creator.trim() && !normalizeText(task.creator).includes(normalizeText(filters.creator))) return false;
  if (filters.method !== "全部" && task.method !== filters.method) return false;
  if (filters.packageType !== "全部" && task.packageType !== filters.packageType) return false;

  if (filters.createdDate && formatDate(parseDateTime(task.createdAt)) !== filters.createdDate) return false;
  return true;
}

function normalizeText(value) {
  return String(value ?? "").trim().toLowerCase();
}

function taskCreatorOptions() {
  return [...new Set(taskRowsWithDraft().filter(taskBelongsToTopRegion).map(task => task.creator).filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}

function strategyMethodLabel(strategy) {
  return {
    version: "指定版本",
    file: "文件导入",
    manual: "手动导入",
  }[strategy] || "-";
}

function renderTaskListRow(task) {
  return task.isDraft ? renderDraftTaskRow(task) : renderTaskTableRow(task);
}

function renderTaskTableRow(task) {
  return `
    <tr>
      <td title="${task.name}">
        <div class="task-name-cell">
          <strong>${task.name}</strong>
          ${task.syncBatchId ? `<span class="mini-tag blue">跨大区同步</span>` : ""}
        </div>
      </td>
      ${renderTaskDataCells(task)}
      <td>${renderTaskStatus(task.status)}</td>
      <td class="sticky-action-col">${renderTaskActions(task.status)}</td>
    </tr>
  `;
}

function renderTaskDataCells(task) {
  const cellMap = {
    method: `<td>${task.method}</td>`,
    packageType: `<td>${task.packageType}</td>`,
    targetVersion: `<td>${task.targetVersion}</td>`,
    total: `<td>${renderTaskScale(task)}</td>`,
    time: `<td title="${task.time}">${task.time}</td>`,
    result: `<td>${renderTaskResult(task)}</td>`,
    region: `<td title="${task.region}">${task.region}</td>`,
    creator: `<td>${task.creator}</td>`,
    createdAt: `<td>${task.createdAt}</td>`,
  };
  return taskColumnOptions.map(([key]) => state.visibleTaskColumns[key] ? cellMap[key] : "").join("");
}

function renderTaskScale(task) {
  if (task.method === "指定版本") {
    if (task.quantityMode === "batch") {
      return `<button class="link-btn task-scale-link" type="button" data-route="task-detail">${Number(task.planned || 0).toLocaleString()}</button>`;
    }
    return `<button class="link-btn task-scale-link" type="button" data-route="task-detail">全量</button>`;
  }

  if (!task.total || task.total === "-") return "-";
  return `<button class="link-btn task-scale-link" type="button" data-route="task-detail">${Number(task.total).toLocaleString()}</button>`;
}

function renderTaskResult(task) {
  const result = task.result;
  if (!result) return "-";
  if (task.method === "指定版本") {
    if (task.quantityMode === "batch") {
      const planned = Number(task.planned || 0);
      const matched = Number(result.matched || 0);
      return `
        <div class="result-stack">
          <span class="success">已匹配 ${matched.toLocaleString()} / 计划 ${planned.toLocaleString()}</span>
          <span class="failed">成功 ${Number(result.success || 0).toLocaleString()} / 失败 ${Number(result.failed || 0).toLocaleString()}</span>
        </div>
      `;
    }

    return `
      <div class="result-stack">
        <span class="success">已匹配 ${Number(result.matched || 0).toLocaleString()}</span>
        <span class="failed">成功 ${Number(result.success || 0).toLocaleString()} / 失败 ${Number(result.failed || 0).toLocaleString()}</span>
      </div>
    `;
  }

  const successPercent = result.total ? ((result.success / result.total) * 100).toFixed(1) : "0.0";
  const failedPercent = result.total ? ((result.failed / result.total) * 100).toFixed(1) : "0.0";
  return `
    <div class="result-stack">
      <span class="success">成功 ${Number(result.success).toLocaleString()}（${successPercent}%）</span>
      <span class="failed">失败 ${Number(result.failed).toLocaleString()}（${failedPercent}%）</span>
    </div>
  `;
}

function renderTaskStatus(status) {
  return statusTag(status);
}

function renderTaskActions(status) {
  const actions = taskStatusMeta[status]?.actions || ["detail"];
  const actionMap = {
    detail: `<button class="link-btn" type="button" data-route="task-detail">详情</button>`,
    end: `<button class="link-btn danger" type="button" data-action="end-task">结束任务</button>`,
    copyRebuild: `<button class="link-btn" type="button" data-action="copy-rebuild-task">复制重建</button>`,
    editDraft: `<button class="link-btn" type="button" data-action="edit-draft">编辑</button>`,
    deleteDraft: `<button class="link-btn danger" type="button" data-action="delete-draft">删除</button>`,
  };
  return `<div class="table-actions">${actions.map(action => actionMap[action]).filter(Boolean).join("")}</div>`;
}

function renderDraftTaskRow(draftRow) {
  return `
    <tr class="draft-row">
      <td title="${draftRow.name}">
        <div class="task-name-cell">
          <strong>${draftRow.name}</strong>
          <span class="mini-tag orange">草稿</span>
          ${draftRow.syncRegions?.length ? `<span class="mini-tag blue">跨大区同步</span>` : ""}
        </div>
      </td>
      ${renderTaskDataCells(draftRow)}
      <td>${renderTaskStatus("待发布")}</td>
      <td class="sticky-action-col">${renderTaskActions("待发布")}</td>
    </tr>
  `;
}

function statusTag(status) {
  const cls = taskStatusMeta[status]?.color || {
    "升级中": "green",
    "已完成": "blue",
    "待执行": "gray",
    "已结束": "gray",
    "已驳回": "red",
    "不可升级": "orange",
    "可升级": "green",
    "可发布": "green",
    "需处理": "orange",
    "异常": "orange",
    "已终止": "gray",
    "草稿": "orange",
    "纳入升级": "green",
    "本版本不升级": "orange",
  }[status] || "gray";
  return `<span class="status-tag ${cls}">${status}</span>`;
}

function renderCreateTask() {
  return `
    <section class="page form-page">
      ${renderPageHeader("新增任务", { back: "task-list" })}
      <div class="annotated-block">
        ${renderCreateSteps()}
        ${renderRequirementNote("PRD 03", "新增任务三步流程", [
          "流程调整为选择升级方式、配置任务内容、预览发布。",
          "升级方式前置决定跨大区、审批、设备数口径和后续配置项。",
          "发布结果通过弹窗说明当前状态、下一步流转和查看入口。",
        ])}
      </div>
      <div class="workbench-shell">
        <div class="workbench-main">
          ${renderCreateStepContent()}
        </div>
      </div>
      <div class="annotated-block sticky-note-host">
        ${renderWizardActions()}
        ${renderRequirementNote("PRD 03 / 04", "草稿与发布反馈", [
          "保存草稿后返回任务列表，状态为待发布，并支持二次编辑。",
          "提交审批成功进入待审批；无需审批发布成功后按任务时间进入待执行或后续执行态。",
        ])}
      </div>
    </section>
  `;
}

function renderCreateSteps() {
  const steps = [
    ["选择升级方式", "先确定策略分支"],
    ["配置任务内容", "按策略填写字段"],
    ["预览发布", "确认预检与流转"],
  ];
  return `
    <ol class="step-rail" aria-label="新增任务步骤">
      ${steps.map(([title, desc], index) => {
        const step = index + 1;
        const cls = step < state.createStep ? "done" : step === state.createStep ? "active" : "locked";
        return `<li class="${cls}"><span>${step < state.createStep ? "✓" : step}</span><strong>${title}</strong><em>${desc}</em></li>`;
      }).join("")}
    </ol>
  `;
}

function renderCreateStepContent() {
  if (state.createStep === 1) return renderStrategySelectionStep();
  if (state.createStep === 2) return renderTaskContentStep();
  if (state.createStep === 3) return renderPreviewStep();
  return renderStrategySelectionStep();
}

function renderStrategySelectionStep() {
  return `
    <section class="workbench-card step-card">
      <div class="card-heading">
        <div>
          <span class="eyebrow">Step 1</span>
          <h3>选择升级方式</h3>
        </div>
        <span class="soft-pill blue-pill">策略决定后续链路</span>
      </div>
      ${renderRequirementNote("PRD 03", "升级方式前置", [
        "先选择指定版本、文件导入或手动导入，再进入任务内容配置。",
        "指定版本支持当前大区和跨大区同步；文件/手动仅支持当前大区。",
        "指定版本/文件导入需审批，手动导入无需审批。",
      ])}
      <div class="strategy-grid strategy-entry-grid">
        ${strategyCard("version", "指定版本号升级", "动态匹配符合源版本和区域条件的设备，适合正式发版、安全补丁和多大区同步。", ["可跨大区", "需审批", "动态匹配"])}
        ${strategyCard("file", "文件导入升级", "上传明确设备清单，适合运营定向升级和名单制发布。", ["仅当前大区", "需审批", "固定清单"])}
        ${strategyCard("manual", "手动导入升级", "最多 10 台，适合灰度测试、单台验证或临时处理。", ["仅当前大区", "无需审批", "≤10台"])}
      </div>
      ${renderStrategyDecisionPanel()}
    </section>
  `;
}

function renderStrategyDecisionPanel() {
  const meta = strategyMeta[state.strategy];
  const rows = [
    ["跨大区能力", state.strategy === "version" ? "支持当前大区 / 跨大区同步" : "仅支持当前顶部大区"],
    ["审批规则", meta.approval],
    ["设备数口径", state.strategy === "version" ? "创建阶段不展示真实设备总数，执行期动态匹配" : "基于明确设备清单展示总数、可升级数和异常数"],
    ["详情查看", state.strategy === "version" && state.taskScope === "sync" ? "各大区切换顶部大区分别查看，中国区展示子节点统计" : "按当前顶部大区查看升级概览和设备列表"],
  ];
  return `
    <div class="strategy-decision-panel">
      <div>
        <strong>${meta.title}</strong>
        <p>${meta.desc}</p>
      </div>
      <dl>
        ${rows.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}
      </dl>
    </div>
  `;
}

function renderTaskContentStep() {
  return `
    ${renderBasicInfoStep()}
    ${renderStrategyStep()}
  `;
}

function renderBasicInfoStep() {
  return `
    <section class="workbench-card step-card">
      <div class="card-heading">
        <div>
          <span class="eyebrow">Step 2</span>
          <h3>基础信息</h3>
        </div>
        <span class="soft-pill">${strategyMeta[state.strategy].short}</span>
      </div>
      ${renderRequirementNote("PRD 03", "基础信息必填规则", [
        "任务名称、任务下发范围、目标固件版本、任务起止时间、任务升级说明均为必填。",
        "指定版本可在基础信息中选择当前大区任务或跨大区同步任务；文件/手动导入固定为当前顶部大区。",
        "过去日期不可选；默认开始时间为当前时间后 5 分钟。",
      ])}
      <div class="form-grid element-form basic-info-form">
        <label class="field-stack basic-name-field ${state.errors.taskName ? "has-error" : ""}">
          ${renderRequirementNote("PRD 03", "任务名称字段要求", [
            "必填，1-64 个字符，不允许只输入空格。",
            "建议包含升级对象、地区或升级目的，便于列表识别。",
            "未填写提示：请输入任务名称；超过 64 个字符时禁止继续输入或提示最多 64 个字符。",
          ])}
          <span><span class="required">*</span> 任务名称</span>
          <div class="input-with-count">
            <input class="input" value="${state.form.taskName}" aria-label="任务名称" data-field="taskName" maxlength="64" />
            <span class="count">${state.form.taskName.length} / 64</span>
          </div>
          ${renderFieldError("taskName")}
        </label>
        <div class="field-stack basic-region-field ${state.errors.selectedRegions || state.errors.syncRegions ? "has-error" : ""}">
          ${renderRequirementNote("PRD 03", "任务下发范围字段要求", [
            "指定版本可选择当前大区任务或跨大区同步任务。",
            "当前大区任务只能在当前顶部大区内选择执行范围；跨大区同步只选择父级目标大区。",
            "文件导入和手动导入仅支持当前顶部大区，任务下发范围展示为只读。",
          ])}
          <span><span class="required">*</span> 任务下发范围</span>
          ${renderExecutionRegionField()}
        </div>
        <label class="field-stack basic-version-field ${state.errors.targetVersion ? "has-error" : ""}">
          ${renderRequirementNote("PRD 03", "目标固件版本字段要求", [
            "必选，只能从已上架或已生成升级包的目标版本中选择。",
            "未选择提示：请选择目标固件版本；版本不可用提示当前版本暂不可用。",
            "切换整包/差分包时需展示对应版本可用状态，已是目标版本的设备不进入升级范围。",
          ])}
          <span><span class="required">*</span> 目标固件版本</span>
          <select class="select" aria-label="目标固件版本" data-field="targetVersion">
            <option value="23.422.209.17" ${state.form.targetVersion === "23.422.209.17" ? "selected" : ""}>${state.packageType === "diff" ? "23.422.209.17（差分包生成成功）" : "23.422.209.17（已上架）"}</option>
            <option>23.110.105.46</option>
            <option>10.176.46</option>
          </select>
          <em class="field-help">已是目标版本的设备不会进入升级范围。</em>
          ${renderFieldError("targetVersion")}
        </label>
        <label class="field-stack basic-time-field ${state.errors.taskTime ? "has-error" : ""}">
          ${renderRequirementNote("PRD 03", "任务起止时间字段要求", [
            "必选，开始时间不得早于当前时间，结束时间必须晚于开始时间。",
            "默认开始时间为当前时间后 5 分钟，过去日期不可选。",
            "未选择提示：请选择任务起止时间；支持未来 7 天、30 天、90 天快捷设置。",
          ])}
          <span><span class="required">*</span> 任务起止时间</span>
          ${renderDateRangePicker()}
          ${renderQuickRangeButtons()}
          ${renderFieldError("taskTime")}
        </label>
        <label class="field-stack wide-field basic-desc-field ${state.errors.upgradeDesc ? "has-error" : ""}">
          ${renderRequirementNote("PRD 03", "任务升级说明字段要求", [
            "必填，1-500 个有效字符，不允许只输入空格。",
            "需说明升级目标、影响范围、灰度或回滚关注点。",
            "未填写提示：请输入任务升级说明；超过 500 个字符提示最多 500 个字符。",
            "多行文本框右下角展示字数统计，输入后即时更新。",
          ])}
          <span><span class="required">*</span> 任务升级说明</span>
          <div class="textarea-with-count">
            <textarea class="textarea compact-textarea" placeholder="请输入升级目标、影响范围、灰度或回滚关注点。" aria-label="任务升级说明" data-field="upgradeDesc" maxlength="500">${state.form.upgradeDesc}</textarea>
            <span class="count textarea-count">${state.form.upgradeDesc.length} / 500</span>
          </div>
          ${renderFieldError("upgradeDesc")}
        </label>
      </div>
    </section>
  `;
}

function renderQuickRangeButtons() {
  return `
    <div class="quick-range-row" role="group" aria-label="快捷选择任务周期">
      ${[
        [7, "未来7天"],
        [30, "未来30天"],
        [90, "未来90天"],
      ].map(([days, label]) => `
        <button class="quick-range-btn ${state.quickRangeDays === days ? "active" : ""}" type="button" data-action="set-quick-range" data-days="${days}">${label}</button>
      `).join("")}
    </div>
  `;
}

function renderFieldError(key) {
  return state.errors[key] ? `<em class="field-error">${state.errors[key]}</em>` : "";
}

function renderDateRangePicker() {
  const startLabel = state.taskStartAt || "请选择开始时间";
  const endLabel = state.taskEndAt || "请选择结束时间";
  return `
    <div class="date-range-picker ${state.datePickerOpen ? "open" : ""}">
      <button class="date-range-trigger" type="button" data-action="toggle-date-picker" aria-expanded="${state.datePickerOpen}">
        ${icon("clock")}
        <span class="${state.taskStartAt ? "" : "placeholder"}">${startLabel}</span>
        <em>至</em>
        <span class="${state.taskEndAt ? "" : "placeholder"}">${endLabel}</span>
        <i data-action="clear-date-range" aria-label="清空时间">${icon("close")}</i>
      </button>
      ${state.datePickerOpen ? renderDateRangePanel() : ""}
    </div>
  `;
}

function renderDateRangePanel() {
  const fallbackStart = addMinutes(new Date(), 5);
  const start = state.taskStartAt ? parseDateTime(state.taskStartAt) : fallbackStart;
  const end = state.taskEndAt ? parseDateTime(state.taskEndAt) : addDays(fallbackStart, 7);
  const nextMonth = new Date(start.getFullYear(), start.getMonth() + 1, 1);
  return `
    <div class="date-range-panel" data-stop>
      <div class="date-range-panel-inputs">
        <input value="${state.taskStartAt ? formatDate(start) : ""}" placeholder="开始日期" aria-label="开始日期" readonly />
        <input value="${state.taskStartAt ? formatTime(start) : ""}" placeholder="开始时间" aria-label="开始时间" readonly />
        <span>›</span>
        <input value="${state.taskEndAt ? formatDate(end) : ""}" placeholder="结束日期" aria-label="结束日期" readonly />
        <input value="${state.taskEndAt ? formatTime(end) : ""}" placeholder="结束时间" aria-label="结束时间" readonly />
      </div>
      <div class="calendar-switch">
        <button type="button" data-action="shift-calendar" data-shift="-2">«</button>
        <button type="button" data-action="shift-calendar" data-shift="-1">‹</button>
        <strong>${start.getFullYear()} 年 ${start.getMonth() + 1} 月</strong>
        <strong>${nextMonth.getFullYear()} 年 ${nextMonth.getMonth() + 1} 月</strong>
        <button type="button" data-action="shift-calendar" data-shift="1">›</button>
        <button type="button" data-action="shift-calendar" data-shift="2">»</button>
      </div>
      <div class="calendar-grid-wrap">
        ${renderCalendarMonth(start, "start")}
        ${renderCalendarMonth(nextMonth, "end")}
      </div>
      <div class="date-range-footer">
        <button class="link-btn" type="button" data-action="clear-date-range">清空</button>
        <button class="btn primary" type="button" data-action="confirm-date-range">确定</button>
      </div>
    </div>
  `;
}

function renderCalendarMonth(date, target) {
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const gridStart = addDays(monthStart, -monthStart.getDay());
  const startDate = state.taskStartAt ? startOfDay(parseDateTime(state.taskStartAt)) : null;
  const endDate = state.taskEndAt ? startOfDay(parseDateTime(state.taskEndAt)) : null;
  const today = startOfDay(new Date());
  const days = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
  return `
    <div class="calendar-month">
      <div class="calendar-weekdays">${["日", "一", "二", "三", "四", "五", "六"].map(day => `<span>${day}</span>`).join("")}</div>
      <div class="calendar-days">
        ${days.map(day => {
          const inMonth = day.getMonth() === date.getMonth();
          const disabled = startOfDay(day) < today;
          const selected = Boolean(startDate && endDate) && (startOfDay(day).getTime() === startDate.getTime() || startOfDay(day).getTime() === endDate.getTime());
          const inRange = Boolean(startDate && endDate) && startOfDay(day) > startDate && startOfDay(day) < endDate;
          return `
            <button
              type="button"
              class="${inMonth ? "" : "muted"} ${disabled ? "disabled" : ""} ${selected ? "selected" : ""} ${inRange ? "in-range" : ""}"
              ${disabled ? "disabled" : ""}
              data-action="select-date"
              data-target="${target}"
              data-date="${formatDate(day)}"
            >${day.getDate()}</button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderRegionTags(regions, placeholder, action = "remove-region") {
  if (!regions.length) return `<span class="select-placeholder">${placeholder}</span>`;
  const visible = regions.slice(0, 3);
  const more = regions.length - visible.length;
  return `
    ${visible.map(region => `
      <span class="chip removable-chip">
        ${region}
        <button type="button" aria-label="移除 ${region}" data-action="${action}" data-region="${region}">${icon("close")}</button>
      </span>
    `).join("")}
    ${more > 0 ? `<span class="chip muted-chip">+ ${more}</span>` : ""}
  `;
}

function renderExecutionRegionField() {
  if (isFixedCurrentRegionStrategy()) {
    return `
      <div class="readonly-region-card">
        <strong>${state.topRegion}</strong>
        <span>${strategyMeta[state.strategy].short}仅支持当前顶部大区；非当前大区设备进入异常明细。</span>
      </div>
    `;
  }

  if (state.strategy === "version") {
    return `
      <section class="task-scope-panel basic-task-scope-panel">
        <div class="task-scope-head">
          <span class="field-caption">任务范围</span>
          <p>${state.taskScope === "sync" ? "跨大区同步会提交统一审批，审批通过后分别生成各大区本地任务。" : "当前大区任务仅在顶部选择的大区及已选子节点内执行。"}</p>
        </div>
        <div class="scope-segmented" role="radiogroup" aria-label="任务范围">
          ${scopeRadio("current", "当前大区任务", "按当前顶部大区和所选子节点创建")}
          ${scopeRadio("sync", "跨大区同步", "按父级大区同步创建本地任务")}
        </div>
        ${state.taskScope === "sync" ? renderSyncRegionPicker() : renderCurrentRegionScopePicker()}
      </section>
    `;
  }

  return renderCurrentRegionScopePicker();
}

function renderCurrentRegionScopePicker() {
  return `
    <div class="current-region-scope-panel">
      <div class="current-region-head">
        <span>当前大区执行范围</span>
        <em>顶部大区：${state.topRegion}</em>
      </div>
      <div class="select-field multi-select-field ${state.regionDropdownOpen ? "open" : ""}" data-action="toggle-region-dropdown">
        <div class="multi-select-values">
          ${renderRegionTags(state.selectedRegions, "请选择当前大区执行范围", "remove-region")}
        </div>
        ${icon("chevron", "select-arrow")}
        ${state.regionDropdownOpen ? renderRegionScopeDropdown("execution") : ""}
      </div>
      ${renderFieldError("selectedRegions")}
      <em class="field-help">只能选择当前顶部大区及其子节点；切换顶部大区后会按新大区重置可选范围。</em>
    </div>
  `;
}

function renderRegionScopeDropdown(type) {
  const isCondition = type === "condition";
  const selected = isCondition ? state.conditionRegions : state.selectedRegions;
  const options = isCondition ? availableConditionRegions() : currentRegionScopeOptions();
  const action = isCondition ? "toggle-condition-region" : "toggle-region";
  const selectAllAction = isCondition ? "select-all-condition-regions" : "select-all-regions";
  const clearAction = isCondition ? "clear-condition-regions" : "clear-regions";
  return `
    <div class="cascader-dropdown scope-region-dropdown" data-stop>
      <div class="select-dropdown-tools">
        <span>${isCondition ? "策略条件地区" : `当前顶部大区：${state.topRegion}`}</span>
        <div>
          <button class="link-btn" type="button" data-action="${selectAllAction}">全选</button>
          <button class="link-btn" type="button" data-action="${clearAction}">清空</button>
        </div>
      </div>
      <div class="scope-region-options">
        ${options.map(region => renderScopeRegionOption(region, selected.includes(region), action)).join("")}
      </div>
    </div>
  `;
}

function renderScopeRegionOption(region, selected, action) {
  return `
    <label class="scope-region-option ${selected ? "checked" : ""}" data-action="${action}" data-region="${region}">
      <input type="checkbox" ${selected ? "checked" : ""} />
      <span>${region}</span>
    </label>
  `;
}

function renderStrategyStep() {
  const packageLabel = state.packageType === "whole" ? "整包" : "差分包";
  return `
    <section class="workbench-card step-card">
      <div class="card-heading">
        <div>
          <span class="eyebrow">Step 2</span>
          <h3>升级配置</h3>
        </div>
        <span class="soft-pill">当前方式：${strategyMeta[state.strategy].short}</span>
      </div>
      ${renderRequirementNote("PRD 06 / 07 / 08", "策略配置规则", [
        "升级方式支持指定版本、文件导入、手动导入。",
        "指定版本不再拆分三个规则切换，统一通过源版本表格勾选。",
        "全量展示全量；批量只支持统一输入数量，不支持单版本分别输入。",
      ])}
      <div class="selected-strategy-strip">
        <div>
          <strong>${strategyMeta[state.strategy].title}</strong>
          <span>${strategyMeta[state.strategy].desc}</span>
        </div>
        <button class="link-btn" type="button" data-action="prev-create-step">切换升级方式</button>
      </div>
      <div class="config-section">
        <h4>升级包类型</h4>
        <div class="package-choice-panel" role="radiogroup" aria-label="升级包类型">
          ${packageTypeCard("whole", "整包")}
          ${packageTypeCard("diff", "差分包")}
          <div class="package-desc-card">${icon("info")} ${state.packageType === "whole"
            ? "整包适用于常规升级和跨版本升级，兼容性更高。"
            : "差分包适合连续版本小包升级，下发更快；仅支持 4G 模组产线。"}</div>
        </div>
      </div>
      <div class="strategy-config-panel">
        ${renderStrategyBody(packageLabel)}
      </div>
    </section>
  `;
}

function renderPreviewStep() {
  return `
    <section class="workbench-card step-card">
      <div class="card-heading">
        <div>
          <span class="eyebrow">Step 3</span>
          <h3>预览发布</h3>
        </div>
        ${state.strategy === "version" ? `<span class="soft-pill blue-pill">动态匹配预览</span>` : renderPreviewScenarioSwitch()}
      </div>
      ${renderRequirementNote("PRD 03 / 14", "预览发布场景", [
        "需支持部分可升级、无可升级、全部可升级三种场景模拟。",
        "无可升级时不允许发布；指定版本和文件导入方式发布需进入审批流程。",
        "异常场景支持下载异常明细。",
      ])}
      ${renderPreviewContent(false)}
    </section>
  `;
}

function renderPreviewScenarioSwitch() {
  const options = [
    ["mixed", "部分可升级"],
    ["blocked", "无可升级"],
    ["clean", "全部可升级"],
  ];
  return `
    <div class="preview-scenario-switch" role="group" aria-label="预览发布模拟场景">
      ${options.map(([value, label]) => `
        <button class="${state.previewScenario === value ? "active" : ""}" type="button" data-preview="${value}">${label}</button>
      `).join("")}
    </div>
  `;
}

function finishDeviceScaleText() {
  if (state.strategy === "version") {
    if (state.quantityMode === "full") {
      return "全量动态匹配，实际设备数以执行结果为准";
    }
    return `计划成功下发 ${Number(state.batchQuantity || 0).toLocaleString()} 台，执行期动态匹配`;
  }

  const data = previewData();
  return `${data.good} 台进入升级队列，${data.bad} 台异常跳过`;
}

function renderWizardActions() {
  return `
    <div class="sticky-actions">
      <button class="btn" type="button" data-action="${state.createStep === 1 ? "cancel-create" : "prev-create-step"}">${state.createStep === 1 ? "取消" : "上一步"}</button>
      <button class="btn" type="button" data-action="save-task">保存草稿</button>
      ${state.createStep < 3
        ? `<button class="btn primary" type="button" data-action="next-create-step">${state.createStep === 1 ? "下一步：配置任务内容" : "下一步：预览发布"}</button>`
        : `${shouldShowPreviewExceptions() ? `<button class="btn" type="button" data-action="download-exception">${icon("download")}下载异常明细</button>` : ""}${renderPublishButton()}`}
    </div>
  `;
}

function radio(name, value, label, current) {
  return `
    <label class="radio">
      <input type="radio" name="${name}" value="${value}" ${current === value ? "checked" : ""} data-radio="${name}" />
      <span>${label}</span>
    </label>
  `;
}

function packageTypeCard(value, title) {
  return `
    <button class="package-type-card ${state.packageType === value ? "active" : ""}" type="button" data-package-card="${value}">
      <span class="radio-dot"></span>
      <strong>${title}</strong>
    </button>
  `;
}

function strategyCard(value, title, desc, tags) {
  return `
    <button class="strategy-card ${state.strategy === value ? "active" : ""}" type="button" data-strategy="${value}">
      <strong>${title}</strong>
      <span>${desc}</span>
      <div class="strategy-tags">${tags.map(tag => `<em>${tag}</em>`).join("")}</div>
    </button>
  `;
}

function renderStrategyBody(packageLabel) {
  if (state.strategy === "file") return renderFileStrategy(packageLabel);
  if (state.strategy === "manual") return renderManualStrategy(packageLabel);
  return renderVersionStrategy(packageLabel);
}

function renderVersionStrategy(packageLabel) {
  const selectableVersions = firmwareVersions.filter(item => !(state.packageType === "diff" && !item.diffReady));
  const allChecked = selectableVersions.every(item => state.selectedVersions.includes(item.version));
  return `
    <div class="config-panel-heading">
      <div>
        <strong>指定版本号升级配置</strong>
        <p>任务范围已在基础信息中确定；此处选择可升级源版本并设置全量 / 批量策略。</p>
      </div>
      <span class="soft-pill blue-pill">已选择 ${state.selectedVersions.length} 个源版本</span>
    </div>
    <div class="rule-panel">
      ${renderFieldError("strategy")}
      ${renderVersionScopeSummary()}
      <div class="quantity-panel">
        <span class="field-caption">配置升级数量</span>
        <div class="segmented compact-segmented" role="radiogroup" aria-label="升级数量">
          ${radio("quantityMode", "full", "全量", state.quantityMode)}
          ${radio("quantityMode", "batch", "批量", state.quantityMode)}
        </div>
        ${state.quantityMode === "batch"
          ? `<label class="quantity-input"><span>统一下发数量</span><input class="table-input" type="number" min="0" value="${state.batchQuantity}" aria-label="统一下发数量" data-batch-quantity /><em>台</em></label>`
          : ""}
        <span class="quantity-copy">${state.quantityMode === "full" ? "按表格勾选范围下发全部可升级版本" : "所有勾选源版本统一按该数量下发"}</span>
      </div>
      ${renderFieldError("batchQuantity")}
      <div class="version-table">
        <table>
          <thead>
            <tr>
              <th style="width: 72px"><label class="table-check"><input type="checkbox" ${allChecked ? "checked" : ""} aria-label="全选源版本" data-action="toggle-all-versions" /></label></th>
              <th>源版本号</th>
              <th>升级设备数</th>
            </tr>
          </thead>
          <tbody>${renderVersionRows()}</tbody>
        </table>
      </div>
      ${renderStrategyConditions()}
    </div>
  `;
}

function renderVersionScopeSummary() {
  const isSync = state.taskScope === "sync";
  const title = isSync ? "跨大区同步任务" : "当前大区任务";
  const regions = isSync
    ? renderMiniRegionTags(state.syncRegions)
    : renderMiniRegionTags(state.selectedRegions);
  return `
    <section class="task-scope-panel">
      <div class="task-scope-head">
        <span class="field-caption">任务范围承接</span>
        <p>任务下发范围已在基础信息中确定，升级配置不再二次选择范围。</p>
      </div>
      <div class="scope-summary-card ${isSync ? "sync" : ""}">
        <strong>${isSync ? `<span class="mini-tag blue">跨大区同步</span>` : ""}${title}</strong>
        <div class="preview-tag-list">${regions}</div>
        <span>${isSync ? "审批通过后按所选父级大区生成本地任务；列表和详情按顶部大区分别查看。" : "仅在当前顶部大区及所选子节点内动态匹配可升级设备。"}</span>
      </div>
    </section>
  `;
}

function scopeRadio(value, title, desc) {
  return `
    <label class="scope-option ${state.taskScope === value ? "active" : ""}">
      <input type="radio" name="taskScope" value="${value}" ${state.taskScope === value ? "checked" : ""} data-radio="taskScope" />
      <span></span>
      <strong>${title}</strong>
      <em>${desc}</em>
    </label>
  `;
}

function renderSyncRegionPicker() {
  return `
    <div class="sync-region-panel">
      <div class="sync-region-head">
        <span>同步目标大区</span>
        <em>已选择 ${state.syncRegions.length} 个</em>
      </div>
      <div class="sync-region-options">
        ${syncRegionOptions.map(region => `
          <label class="sync-region-option ${state.syncRegions.includes(region) ? "checked" : ""}" data-action="toggle-sync-region" data-region="${region}">
            <input type="checkbox" ${state.syncRegions.includes(region) ? "checked" : ""} />
            <span>${region}</span>
            ${region === "中国" ? "<em>覆盖全部中国子节点</em>" : ""}
          </label>
        `).join("")}
      </div>
      ${renderFieldError("syncRegions")}
      <div class="scope-note">${icon("info")} 跨大区同步只选择父级大区；任务详情仍需切换顶部大区分别查看，中国详情展示杭州、杭州低功耗、深圳、成都、上海（宠物）节点统计。</div>
    </div>
  `;
}

function renderFileStrategy(packageLabel) {
  return `
    <div class="config-panel-heading">
      <div>
        <strong>文件导入升级配置</strong>
        <p>上传设备清单后，系统会自动完成设备识别与发布预检。</p>
      </div>
      <span class="soft-pill">仅当前大区</span>
      <div class="template-actions">
        <button class="btn" type="button" data-action="download-template">下载 CSV 模板</button>
        <button class="btn" type="button" data-action="download-template">下载 Excel 模板</button>
      </div>
    </div>
    <div class="scope-note file-scope-note">${icon("info")} 当前版本文件导入不支持跨大区同步；非当前顶部大区设备会进入异常明细，不会自动拆分到其他大区。</div>
    <div class="import-panel">
      ${renderUploadState()}
    </div>
    ${renderFieldError("fileUpload")}
    ${renderStrategyConditions()}
  `;
}

function renderUploadState() {
  if (!state.fileUploaded) {
    return `
      <button class="upload-box" type="button" data-action="mock-upload">
        ${icon("upload")}
        <strong>点击或拖拽上传设备清单</strong>
        <span>支持 CSV / Excel 文件，一次最多导入 20,000 台设备。</span>
      </button>
    `;
  }

  if (state.fileUploadStatus === "uploading" || state.fileUploadStatus === "checking") {
    const isChecking = state.fileUploadStatus === "checking";
    return `
      <div class="uploaded-file-card is-processing" aria-live="polite">
        <span class="file-icon-box">${icon(isChecking ? "check" : "upload")}</span>
        <div class="uploaded-file-main">
          <div class="uploaded-file-title">
            <strong>${state.uploadFileName}</strong>
            <span>${isChecking ? "正在校验" : "上传中"}</span>
          </div>
          <div class="upload-progress" aria-label="上传进度 ${state.uploadProgress}%">
            <span style="width: ${state.uploadProgress}%"></span>
          </div>
          <p>${isChecking ? "正在匹配设备大区、源固件版本与可升级条件。" : `已上传 ${state.uploadProgress}%，请稍候。`}</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="uploaded-file-card">
      <span class="file-icon-box">${icon("log")}</span>
      <div class="uploaded-file-main">
        <div class="uploaded-file-title">
          <strong>${state.uploadFileName}</strong>
          <span>上传完成</span>
        </div>
        <p>共 <b>${state.uploadDeviceCount}</b> 台设备，文件已就绪，可继续配置策略条件。</p>
      </div>
      <button class="btn" type="button" data-action="mock-upload">重新上传/替换文件</button>
    </div>
  `;
}

function renderManualStrategy(packageLabel) {
  const count = state.manualDevices.length;
  return `
    <div class="manual-import-panel">
      <div class="manual-import-header">
        <div>
          <strong>手动导入升级配置</strong>
          <p>适合小范围验证；最多 10 台，设备 ID 输入后实时校验。当前版本仅支持当前大区。</p>
        </div>
        <span class="manual-count-pill">当前 ${count} / 10 台</span>
      </div>
      <div class="scope-note manual-scope-note">${icon("info")} 非当前大区设备会进入异常，并提示切换到设备所属大区创建。</div>
      <div class="manual-import-table">
        <table>
          <thead>
            <tr>
              <th style="width: 52px">#</th>
              <th>设备 ID</th>
              <th>源固件版本号</th>
              <th>所属大区</th>
              <th>校验状态</th>
              <th style="width: 86px">操作</th>
            </tr>
          </thead>
          <tbody>
            ${renderManualDeviceRows()}
            <tr class="manual-add-table-row">
              <td colspan="6">
                <button class="manual-add-row" type="button" data-action="add-manual-device" ${count >= 10 ? "disabled" : ""}>${icon("plus")}添加设备</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    ${renderFieldError("manualDevices")}
    ${renderStrategyConditions()}
  `;
}

function renderManualDeviceRows() {
  return state.manualDevices.map((device, index) => {
    const value = device.deviceId || "";
    const version = device.version || (value ? "自动检索中" : "-");
    const region = device.region || (value ? "自动检索中" : "-");
    const status = value ? statusTag(device.status || "可升级") : "-";
    return `
      <tr>
        <td>${index + 1}</td>
        <td><input class="input manual-device-input" value="${value}" placeholder="请输入设备 ID" aria-label="设备ID ${index + 1}" data-manual-device-input data-device-id="${device.id}" /></td>
        <td>${version}</td>
        <td>${region}</td>
        <td>${status}</td>
        <td><button class="link-btn danger-link" data-action="remove-device" data-device-id="${device.id}">删除</button></td>
      </tr>
    `;
  }).join("");
}

function renderVersionRows() {
  return firmwareVersions.map(item => {
    const disabled = state.packageType === "diff" && !item.diffReady;
    const selected = state.selectedVersions.includes(item.version) && !disabled;
    const deviceCount = state.quantityMode === "batch" ? `${Number(state.batchQuantity || 0).toLocaleString()} 台` : "全量";
    return `
      <tr class="${disabled ? "muted-row" : ""}">
        <td>
          <label class="table-check">
            <input type="checkbox" ${selected ? "checked" : ""} ${disabled ? "disabled" : ""} aria-label="选择 ${item.version}" data-action="toggle-version" data-version="${item.version}" />
          </label>
        </td>
        <td>${item.version}</td>
        <td>${disabled ? "-" : deviceCount}</td>
      </tr>
    `;
  }).join("");
}

function renderStrategyConditions() {
  const disabled = !state.conditionRegionEnabled;
  const hasConditionOptions = availableConditionRegions().length > 0;
  const conditionDisabled = disabled || !hasConditionOptions || isSyncCreateTask();
  return `
    <div class="condition-panel">
      <div class="condition-row">
        <span class="condition-label">策略条件</span>
        <label class="checkbox-line condition-check"><input type="checkbox" ${state.conditionRegionEnabled ? "checked" : ""} data-action="toggle-condition-region-enabled" ${isSyncCreateTask() ? "disabled" : ""} /> 指定地区</label>
        <div class="select-field condition-operator ${state.regionOperatorOpen ? "open" : ""} ${conditionDisabled ? "disabled" : ""}" data-action="toggle-region-operator">
          <span>${state.regionOperator}</span>
          ${icon("chevron", "select-arrow")}
          ${state.regionOperatorOpen && !conditionDisabled ? `
            <div class="operator-dropdown" data-stop>
              ${["等于", "不等于"].map(option => `
                <button class="${state.regionOperator === option ? "active" : ""}" type="button" data-action="set-region-operator" data-operator="${option}">${option}</button>
              `).join("")}
            </div>
          ` : ""}
        </div>
        <div class="select-field multi-select-field condition-cascader ${state.conditionRegionDropdownOpen ? "open" : ""} ${conditionDisabled ? "disabled" : ""}" data-action="toggle-condition-region-dropdown">
          <div class="multi-select-values">
            ${disabled
              ? `<span class="select-placeholder">未启用指定地区</span>`
              : isSyncCreateTask()
                ? `<span class="select-placeholder">跨大区同步不使用子节点地区条件</span>`
                : renderRegionTags(state.conditionRegions, "请选择地区", "remove-condition-region")}
          </div>
          ${icon("chevron", "select-arrow")}
          ${state.conditionRegionDropdownOpen && !conditionDisabled ? renderRegionScopeDropdown("condition") : ""}
        </div>
      </div>
      <div class="scope-note condition-scope-note">${icon("info")} 策略条件地区只能在当前大区执行范围内进一步收窄，不能扩大到其他顶部大区。</div>
      ${renderFieldError("conditionRegion")}
    </div>
  `;
}

function renderStrategyNote(packageLabel) {
  const meta = strategyMeta[state.strategy];
  return `
    <div class="strategy-note">
      ${icon(state.strategy === "manual" ? "check" : "info")}
      <div>
        <strong>${meta.title}</strong>
        <p>当前使用${packageLabel}，${meta.approval}。${meta.dispatchLabel}</p>
      </div>
    </div>
  `;
}

function renderTaskDetail() {
  normalizeDetailStatusForMode();
  const detail = taskDetailData(state.detailStatus);
  return `
    <section class="page">
      ${renderPageHeader("任务详情", {
        back: "task-list",
      })}
      ${renderDetailStatusSwitch()}
      <div class="annotated-block">
        ${renderDetailHero(detail)}
        ${renderRequirementNote("PRD 11", "顶部任务概览卡", [
          "顶部卡片关注任务本身，状态标签放在任务名称旁边。",
          "展示任务标识、创建人、更新时间、任务说明、目标版本、任务时间、任务大区、升级方式、升级包和策略条件。",
          "不展示重复执行概览，不放查看升级明细按钮，避免与页签导航重复。",
        ])}
      </div>
      <div class="annotated-block compact-note-block">
        ${renderDetailTabs()}
        ${renderRequirementNote("PRD 11", "详情页信息架构", [
          "主页签固定为任务概览和升级明细。",
          "任务概览展示任务配置和流转；升级明细展示升级概览、异常分类和设备列表。",
        ])}
      </div>
      ${renderDetailTabContent(detail)}
    </section>
  `;
}

function renderDetailHeaderActions(detail) {
  const actions = [];
  if (["待执行", "升级中"].includes(detail.status)) {
    actions.push(`<button class="btn danger" type="button" data-action="end-task">结束任务</button>`);
  }
  if (["已驳回", "已失效"].includes(detail.status)) {
    actions.push(`<button class="btn primary" type="button" data-action="copy-rebuild-task">${icon("copy")}复制重建</button>`);
  }
  return actions.join("");
}

function renderDetailTabs() {
  const tabs = [
    ["overview", "任务概览"],
    ["devices", "升级明细"],
  ];
  return `
    <div class="detail-tabs">
      ${tabs.map(([key, label]) => `<button class="${state.detailTab === key ? "active" : ""}" type="button" data-action="set-detail-tab" data-tab="${key}">${label}</button>`).join("")}
    </div>
  `;
}

function renderDetailTabContent(detail) {
  const isExecutionStatus = isDetailExecutionStatus(detail);
  if (state.detailTab === "devices") {
    return isExecutionStatus
      ? `
        <h3 class="section-title">${icon("layer")}升级概览</h3>
        <div class="annotated-block">
          ${renderExecutionOverview(detail)}
          ${renderRequirementNote("PRD 11", "升级概览统计口径", [
            "文件/手动导入展示固定设备总数、已处理、成功、失败、未处理。",
            "指定版本全量只展示已匹配数、成功数、失败数，不展示未知总数百分比。",
            "指定版本批量展示计划成功下发数量、已匹配数和待匹配名额。",
          ])}
        </div>
        <div class="annotated-block">
          ${renderExceptionSummary(detail)}
          ${renderRequirementNote("PRD 11", "异常分类", [
            "仅执行态且存在失败设备时展示。",
            "使用 6 个一级异常分类和 ECharts 基础环形图。",
            "图表与分类列表支持鼠标悬停联动，并提供下载异常明细入口。",
          ])}
        </div>
        <div class="annotated-block">
          ${renderDeviceDetailTable(detail)}
          ${renderRequirementNote("PRD 11", "设备列表", [
            "非执行态展示空状态，不展示设备表格。",
            "执行态展示进入下发链路的设备；指定版本全量仅展示已动态匹配设备。",
            "设备标识搜索与导出设备列表按钮需位于同一工具栏。",
          ])}
        </div>
      `
      : `<div class="empty-state-panel">${icon("info")} 任务尚未进入执行阶段，暂无升级明细。</div>`;
  }
  return `
    <div class="annotated-block">
      ${renderTaskFlowOverview(detail)}
      ${renderRequirementNote("PRD 11 / 09", "任务进度与流转明细", [
        "任务进度只表达流程阶段，不展示设备执行百分比或升级仪表盘。",
        "流转明细按时间线展示创建、审批、下发、完成或结束。",
        "已完成包含成功和失败设备；已结束表示用户提前手动结束。",
      ])}
    </div>
  `;
}

function isDetailExecutionStatus(detail) {
  return ["升级中", "已完成", "已结束"].includes(detail.status);
}

function isManualDetailMode() {
  return state.detailMetricMode === "manual";
}

function requiresApprovalForDetail() {
  return !isManualDetailMode();
}

function isVersionFullDetailMode() {
  return state.detailMetricMode === "versionFull";
}

function isVersionBatchDetailMode() {
  return state.detailMetricMode === "versionBatch";
}

function isVersionSyncDetailMode() {
  return state.detailMetricMode === "versionSync";
}

function isFixedDeviceDetailMode() {
  return ["file", "manual"].includes(state.detailMetricMode);
}

function detailStatusOptionsForMode() {
  return isManualDetailMode()
    ? ["待执行", "升级中", "已完成", "已结束"]
    : ["待审批", "已驳回", "已失效", "待执行", "升级中", "已完成", "已结束"];
}

function normalizeDetailStatusForMode() {
  const statuses = detailStatusOptionsForMode();
  if (!statuses.includes(state.detailStatus)) {
    state.detailStatus = statuses[0];
  }
}

function taskDetailData(status) {
  const modeConfig = detailModeConfig();
  const base = {
    name: "IPC-杭州低功耗_安全补丁升级",
    status,
    creator: "汤彦珊",
    approver: "钱江涛",
    createdAt: "2026-06-03 16:40:12",
    updatedAt: "2026-06-10 09:18:32",
    submittedAt: "2026-06-03 17:20:18",
    approvedAt: "2026-06-03 18:10:42",
    startAt: "2026-06-10 09:00:00",
    endAt: "2026-06-17 09:00:00",
    targetVersion: "23.422.209.17",
    method: modeConfig.method,
    packageType: modeConfig.packageType,
    total: modeConfig.total,
    region: modeConfig.region || "中国 / 杭州低功耗",
    desc: modeConfig.desc,
    sourceScope: modeConfig.sourceScope,
    sourceVersions: modeConfig.sourceVersions || [],
    condition: modeConfig.condition,
    syncBatchId: modeConfig.syncBatchId || "",
    syncRegions: modeConfig.syncRegions || [],
  };
  const variants = {
    "待审批": { success: 0, failed: 0, running: 0, pending: 6505 },
    "已驳回": { success: 0, failed: 0, running: 0, pending: 6505, rejectReason: "目标版本与当前大区策略不一致" },
    "已失效": { success: 0, failed: 0, running: 0, pending: 6505, invalidReason: "审批超时，任务开始时间已过" },
    "待执行": { success: 0, failed: 0, running: 0, pending: 6505 },
    "升级中": { success: 346, failed: 12, running: 3838, pending: 2309 },
    "已完成": { success: 6488, failed: 17, running: 0, pending: 0 },
    "已结束": { success: 730, failed: 8, running: 0, pending: 5767, endedAt: "2026-06-11 15:20:10", endReason: "发现部分设备升级失败率异常，提前停止继续下发" },
  };
  return normalizeDetailMetrics({ ...base, ...(variants[status] || variants["升级中"]) });
}

function detailModeConfig() {
  const common = {
    packageType: "整包",
    desc: "修复低功耗设备夜间唤醒异常，按杭州低功耗大区灰度发布。",
    condition: "指定地区 = 中国 / 杭州低功耗",
  };
  const configs = {
    file: {
      ...common,
      method: "文件导入",
      total: 6505,
      sourceScope: "已导入设备清单：6505 台",
    },
    manual: {
      ...common,
      method: "手动导入",
      total: 2,
      sourceScope: "手动录入设备：VQDG2122086ZPUF、VQDG2122132LYVU",
      desc: "用于少量设备灰度验证，发布后直接进入待执行。",
    },
    versionBatch: {
      ...common,
      method: "指定版本",
      packageType: "差分包",
      total: 6505,
      sourceScope: "23.422.208.91、23.110.105.46、23.110.105.43、10.176.42",
      sourceVersions: ["23.422.208.91", "23.110.105.46", "23.110.105.43", "10.176.42"],
    },
    versionFull: {
      ...common,
      method: "指定版本",
      total: 6505,
      sourceScope: "23.422.208.91、23.110.105.46、23.110.105.43、10.176.42",
      sourceVersions: ["23.422.208.91", "23.110.105.46", "23.110.105.43", "10.176.42"],
    },
    versionSync: {
      ...common,
      method: "指定版本",
      total: 6505,
      region: "中国",
      desc: "多大区安全补丁统一发版，当前页面仅展示中国大区执行结果。",
      condition: "同步目标大区 = 中国、香港、法兰福克、硅谷",
      sourceScope: "23.422.208.91、23.110.105.46、23.110.105.43、10.176.42",
      sourceVersions: ["23.422.208.91", "23.110.105.46", "23.110.105.43", "10.176.42"],
      syncBatchId: "SYNC-20260603-0001",
      syncRegions: ["中国", "香港", "法兰福克", "硅谷"],
    },
  };
  return configs[state.detailMetricMode] || configs.versionFull;
}

function normalizeDetailMetrics(detail) {
  if (isManualDetailMode()) {
    const manualMetrics = {
      "待执行": { success: 0, failed: 0, running: 0, pending: 2 },
      "升级中": { success: 1, failed: 0, running: 1, pending: 0 },
      "已完成": { success: 2, failed: 0, running: 0, pending: 0 },
      "已结束": { success: 1, failed: 0, running: 0, pending: 1 },
    };
    return { ...detail, ...(manualMetrics[detail.status] || manualMetrics["升级中"]) };
  }
  if (isVersionBatchDetailMode()) {
    const batchMetrics = {
      "待审批": { success: 0, failed: 0, running: 0, pending: plannedBatchTotal() },
      "已驳回": { success: 0, failed: 0, running: 0, pending: plannedBatchTotal() },
      "已失效": { success: 0, failed: 0, running: 0, pending: plannedBatchTotal() },
      "待执行": { success: 0, failed: 0, running: 0, pending: plannedBatchTotal() },
      "升级中": { success: 2600, failed: 32, running: 960, pending: 1408 },
      "已完成": { success: 4962, failed: 38, running: 0, pending: 0 },
      "已结束": { success: 2380, failed: 24, running: 0, pending: 2596 },
    };
    return { ...detail, ...(batchMetrics[detail.status] || batchMetrics["升级中"]) };
  }
  return detail;
}

function renderDetailStatusSwitch() {
  const statuses = detailStatusOptionsForMode();
  const metricModes = [
    ["file", "文件导入"],
    ["manual", "手动导入"],
    ["versionFull", "指定版本全量"],
    ["versionBatch", "指定版本批量"],
    ["versionSync", "跨大区同步"],
  ];
  return `
    <div class="detail-status-switch">
      <div class="simulation-row">
        <span>状态模拟</span>
        <div>
          ${statuses.map(status => `<button class="${state.detailStatus === status ? "active" : ""}" type="button" data-action="set-detail-status" data-status="${status}">${status}</button>`).join("")}
        </div>
      </div>
      <div class="simulation-row">
        <span>统计口径</span>
        <div>
          ${metricModes.map(([mode, label]) => `<button class="${state.detailMetricMode === mode ? "active" : ""}" type="button" data-action="set-detail-metric-mode" data-mode="${mode}">${label}</button>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderDetailHero(detail) {
  const summary = taskFlowSummary(detail);
  const actions = renderDetailHeaderActions(detail);
  return `
    <div class="task-overview-card ${summary.tone}">
      ${detail.syncBatchId ? renderSyncTaskNotice(detail) : ""}
      <div class="task-overview-head">
        <div class="task-overview-titlemark">${icon("refresh")}</div>
        <div class="task-overview-title">
          <div class="task-title-line"><h2>${detail.name}</h2>${statusTag(detail.status)}</div>
          <p>任务 ID：OTA-20260610-0008${detail.syncBatchId ? ` · 同步批次：${detail.syncBatchId}` : ""} · 创建人：${detail.creator} · 更新时间：${detail.updatedAt}</p>
          <p class="task-title-desc">${detail.desc}</p>
        </div>
        ${actions ? `<div class="task-overview-actions">${actions}</div>` : ""}
      </div>
      <section class="task-kpi-grid">
        ${renderTaskKpi("目标版本", detail.targetVersion, "blue")}
        ${renderTaskKpi("任务时间", `${detail.startAt}<br />至 ${detail.endAt}`)}
        ${renderTaskKpi("任务大区", detail.region)}
        ${renderTaskKpi("升级设备数", overviewDeviceScale(detail))}
      </section>
      ${renderCurrentFlowState(detail, summary)}
      <section class="task-overview-middle">
        ${renderTaskStrategyPanel(detail)}
        ${renderTaskConditionPanel(detail)}
      </section>
      ${detail.syncBatchId ? renderChinaNodeSummary(detail) : ""}
    </div>
  `;
}

function renderSyncTaskNotice(detail) {
  return `
    <div class="sync-task-notice">
      ${icon("info")}
      <span>该任务来自跨大区同步批次，审批通过后按所选父级大区生成本地任务。当前页仅展示顶部大区结果，如需查看其他大区，请切换顶部大区。</span>
    </div>
  `;
}

function renderCurrentFlowState(detail, summary) {
  const isSync = Boolean(detail.syncBatchId);
  const nextAction = {
    "待审批": "等待产线负责人审批",
    "已驳回": "可复制重建后重新提交",
    "已失效": "可复制重建后重新提交",
    "待执行": "等待到达任务开始时间",
    "升级中": "可查看升级明细或结束任务",
    "已完成": "查看最终结果和异常明细",
    "已结束": "查看结束前处理结果",
  }[detail.status] || "查看任务详情";
  const strategyText = isManualDetailMode()
    ? "手动导入无需审批，发布后直接进入执行队列。"
    : isSync
      ? "跨大区同步使用统一审批；升级包各大区一致，审批通过后生成各大区本地任务。"
      : "该策略需审批，审批通过后按任务时间进入执行队列。";
  return `
    <section class="current-flow-state">
      <div>
        <span>当前链路节点</span>
        <strong>${summary.node}</strong>
        <p>${summary.text}</p>
      </div>
      <dl>
        <div><dt>下一步</dt><dd>${nextAction}</dd></div>
        <div><dt>流转规则</dt><dd>${strategyText}</dd></div>
      </dl>
    </section>
  `;
}

function renderChinaNodeSummary(detail) {
  if (detail.region !== "中国") return "";
  const nodes = [
    ["杭州", 1288, 1276, 12],
    ["杭州低功耗", 2380, 2366, 14],
    ["深圳", 1130, 1122, 8],
    ["成都", 980, 973, 7],
    ["上海（宠物）", 707, 704, 3],
  ];
  return `
    <section class="china-node-panel">
      <div class="task-panel-title">
        <h3>中国区子节点统计</h3>
        <span>按当前中国大区 regionId 聚合展示</span>
      </div>
      <div class="china-node-grid">
        ${nodes.map(([name, matched, success, failed]) => `
          <article>
            <strong>${name}</strong>
            <dl>
              <dt>已匹配</dt><dd>${Number(matched).toLocaleString()} 台</dd>
              <dt>成功</dt><dd class="success">${Number(success).toLocaleString()} 台</dd>
              <dt>失败</dt><dd class="failed">${Number(failed).toLocaleString()} 台</dd>
            </dl>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTaskKpi(label, value, tone = "") {
  return `
    <article class="task-kpi-card ${tone}">
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `;
}

function renderTaskStrategyPanel(detail) {
  const approvalText = requiresApprovalForDetail()
    ? approvalTextForStatus(detail)
    : "无需审批，发布后按任务时间执行";
  return `
    <section class="task-info-panel strategy-panel-compact">
      <div class="task-panel-title"><h3>升级策略</h3></div>
      <div class="task-strategy-grid">
        <dl><dt>升级方式</dt><dd>${detail.method}</dd></dl>
        <dl><dt>升级包</dt><dd>${detail.packageType}</dd></dl>
        <dl><dt>下发方式</dt><dd>${overviewDispatchText(detail)}</dd></dl>
        <dl><dt>审批流程</dt><dd>${approvalText}</dd></dl>
      </div>
    </section>
  `;
}

function approvalTextForStatus(detail) {
  if (!requiresApprovalForDetail()) return "无需审批";
  if (detail.status === "待审批") return `等待 ${detail.approver} 审批`;
  if (detail.status === "已驳回") return `审批驳回：${detail.rejectReason}`;
  if (detail.status === "已失效") return `审批失效：${detail.invalidReason}`;
  return "审批通过后按任务时间执行";
}

function renderTaskExecutionPanel(detail) {
  if (!isDetailExecutionStatus(detail)) {
    return `
      <section class="task-info-panel execution-panel-compact">
        <div class="task-panel-title">
          <h3>执行概览</h3>
          <button class="link-btn" type="button" data-action="set-detail-tab" data-tab="overview">查看流程</button>
        </div>
        <div class="execution-state-card ${summaryToneClass(detail.status)}">
          <span>${preExecutionLabel(detail)}</span>
          <strong>${preExecutionValue(detail)}</strong>
          <p>${preExecutionDescription(detail)}</p>
        </div>
      </section>
    `;
  }

  const stats = metricStats(detail);
  const processed = stats.stocked;
  const denominator = executionDenominator(detail, stats);
  const percent = denominator ? Math.min((processed / denominator) * 100, 100) : 0;
  return `
    <section class="task-info-panel execution-panel-compact">
      <div class="task-panel-title">
        <h3>执行概览</h3>
        <button class="link-btn" type="button" data-action="set-detail-tab" data-tab="devices">查看明细</button>
      </div>
      <div class="execution-mini-grid">
        <div class="blue"><span>${isVersionFullDetailMode() ? "已匹配" : "已处理"}</span><strong>${Number(processed).toLocaleString()}</strong></div>
        <div class="green"><span>成功</span><strong>${Number(stats.upgradeSuccess).toLocaleString()}</strong></div>
        <div class="orange"><span>异常</span><strong>${Number(stats.upgradeFailed).toLocaleString()}</strong></div>
      </div>
      <div class="execution-progress-mini">
        <i style="--progress:${percent}%"></i>
      </div>
      <p class="execution-progress-text">${executionProgressText(detail, stats)}</p>
    </section>
  `;
}

function summaryToneClass(status) {
  if (["已驳回", "已失效"].includes(status)) return "red";
  if (status === "待审批") return "orange";
  return "gray";
}

function preExecutionLabel(detail) {
  if (detail.status === "待审批") return "当前节点";
  if (detail.status === "已驳回" || detail.status === "已失效") return "审批结果";
  return "当前节点";
}

function preExecutionValue(detail) {
  if (detail.status === "待审批") return "等待审批";
  if (detail.status === "已驳回") return "已驳回";
  if (detail.status === "已失效") return "已失效";
  return "待执行";
}

function preExecutionDescription(detail) {
  if (detail.status === "待审批") return `提交时间：${detail.submittedAt}`;
  if (detail.status === "已驳回") return detail.rejectReason;
  if (detail.status === "已失效") return detail.invalidReason;
  return `计划开始：${detail.startAt}`;
}

function executionDenominator(detail, stats) {
  if (isVersionFullDetailMode()) return stats.stocked;
  if (isVersionBatchDetailMode()) return plannedBatchTotal();
  return Number(detail.total) || 0;
}

function executionProgressText(detail, stats) {
  if (isVersionFullDetailMode()) {
    const successRate = stats.stocked ? Math.round((stats.upgradeSuccess / stats.stocked) * 1000) / 10 : 0;
    const failRate = stats.stocked ? Math.round((stats.upgradeFailed / stats.stocked) * 1000) / 10 : 0;
    return `已匹配 ${Number(stats.stocked).toLocaleString()} 台，成功占比 ${successRate}%，失败占比 ${failRate}%`;
  }
  const denominator = executionDenominator(detail, stats);
  const percent = denominator ? Math.round((stats.stocked / denominator) * 1000) / 10 : 0;
  return `当前进度：${Number(stats.stocked).toLocaleString()} / ${Number(denominator).toLocaleString()} 台，约 ${percent}%`;
}

function renderTaskConditionPanel(detail) {
  const isVersionMode = isVersionFullDetailMode() || isVersionBatchDetailMode() || isVersionSyncDetailMode();
  const sourceTitle = isVersionMode ? "指定源版本" : "设备来源";
  const sourceContent = isVersionMode ? renderTaskSourceVersions(detail, state.detailSourceExpanded ? Infinity : 4) : detail.sourceScope;
  const hasMore = isVersionMode && (detail.sourceVersions?.length || 0) > 4;
  const regionLabel = detail.syncBatchId ? "同步目标大区" : "指定地区";
  const regionContent = detail.syncBatchId
    ? detail.syncRegions.map(region => `<span class="condition-chip">${region}</span>`).join("")
    : `<span class="condition-chip">${detail.region}</span>`;
  return `
    <section class="task-condition-panel">
      <div class="task-panel-title">
        <h3>策略条件</h3>
        ${hasMore ? `<button class="link-btn" type="button" data-action="toggle-detail-source">${state.detailSourceExpanded ? "收起" : "展开全部"}</button>` : ""}
      </div>
      <div class="condition-summary-grid">
        <dl><dt>${regionLabel}</dt><dd>${regionContent}</dd></dl>
        <dl><dt>${sourceTitle}</dt><dd>${sourceContent}</dd></dl>
      </div>
    </section>
  `;
}

function overviewDeviceScale(detail) {
  if (isVersionFullDetailMode() || isVersionSyncDetailMode()) return "全量";
  if (isVersionBatchDetailMode()) return `${Number(plannedBatchTotal()).toLocaleString()} 台`;
  return `${Number(detail.total).toLocaleString()} 台`;
}

function overviewDispatchText(detail) {
  if (isVersionSyncDetailMode()) return "跨大区同步，本地动态匹配";
  if (isVersionFullDetailMode()) return "动态匹配";
  if (isVersionBatchDetailMode()) return "批量下发";
  return detail.sourceScope;
}

function taskOverviewFields(detail) {
  const fields = [
    { label: "任务名称", icon: "log", value: detail.name, span: "wide" },
    { label: "目标版本", icon: "layer", value: detail.targetVersion },
    { label: "任务时间", icon: "clock", value: `${detail.startAt} ~ ${detail.endAt}`, span: "wide" },
    { label: "任务大区", icon: "map", value: detail.region },
    { label: "创建人", icon: "users", value: detail.creator },
    { label: "升级方式", icon: "shield", value: detail.method },
    { label: "升级包", icon: "layer", value: detail.packageType },
  ];

  if (isVersionFullDetailMode() || isVersionBatchDetailMode()) {
    fields.push(
      {
        label: "升级设备数",
        icon: "users",
        value: isVersionBatchDetailMode() ? `${Number(plannedBatchTotal()).toLocaleString()} 台` : "全量",
      },
      {
        label: "下发方式",
        icon: "refresh",
        value: isVersionBatchDetailMode() ? "批量下发，按计划成功下发数量控制" : "动态匹配，执行期间持续匹配符合条件设备",
        span: "wide",
      },
      {
        label: "指定源版本",
        icon: "layer",
        value: renderTaskSourceVersions(detail),
        span: "wide",
      },
      {
        label: "匹配条件",
        icon: "map",
        value: `${detail.condition || "无额外条件"}；设备当前版本命中任一指定源版本后纳入匹配。`,
        span: "full",
      },
    );
  } else {
    fields.push(
      { label: "升级设备数", icon: "users", value: `${Number(detail.total).toLocaleString()} 台` },
      { label: "设备来源", icon: "log", value: detail.sourceScope, span: "wide" },
      { label: "匹配条件", icon: "map", value: detail.condition || "无额外条件", span: "wide" },
    );
  }

  fields.push({ label: "任务说明", icon: "info", value: detail.desc, span: "full" });
  return fields;
}

function renderTaskOverviewField(field) {
  return `
    <div class="task-overview-field ${field.span || ""}">
      <dt>${icon(field.icon)}${field.label}</dt>
      <dd>${field.value}</dd>
    </div>
  `;
}

function renderTaskSourceVersions(detail, limit = Infinity) {
  if (!detail.sourceVersions?.length) return "未指定源版本";
  const versions = detail.sourceVersions.slice(0, limit);
  const rest = detail.sourceVersions.length - versions.length;
  return `
    <div class="task-source-version-list">
      ${versions.map(version => `<span>${version}</span>`).join("")}
      ${rest > 0 ? `<span>+${rest}</span>` : ""}
    </div>
  `;
}

function plannedBatchTotal() {
  return 5000;
}

function metricStats(detail) {
  const stocked = Math.max(detail.success + detail.failed, 0);
  const total = Number(detail.total) || 0;
  const pending = isVersionFullDetailMode()
    ? 0
    : Math.max(total - stocked - Number(detail.running || 0), 0);
  return {
    stocked,
    upgradeSuccess: detail.success,
    upgradeFailed: detail.failed,
    pending,
  };
}

function taskFlowSummary(detail) {
  const map = {
    "待审批": {
      node: "等待审批",
      text: "任务已提交发布申请，等待产线负责人审批。",
      extra: "产线负责人处理中",
      tone: "orange",
    },
    "已驳回": {
      node: "审批驳回",
      text: "审批未通过，任务未生效，不会下发 OTA。",
      extra: `驳回原因：${detail.rejectReason}`,
      tone: "red",
    },
    "已失效": {
      node: "审批失效",
      text: "审批未在有效时间内完成，任务已失效，不会下发 OTA。",
      extra: `失效原因：${detail.invalidReason}`,
      tone: "red",
    },
    "待执行": {
      node: "等待执行",
      text: requiresApprovalForDetail() ? "任务已审批通过，等待到达任务开始时间后自动下发。" : "任务已发布，等待到达任务开始时间后自动下发。",
      extra: `计划开始时间：${detail.startAt}`,
      tone: "gray",
    },
    "升级中": {
      node: "执行中",
      text: "任务已进入 OTA 下发阶段，设备正在回传升级结果。",
      extra: "执行结果持续回传中",
      tone: "blue",
    },
    "已完成": {
      node: "任务完成",
      text: isVersionFullDetailMode() ? "动态匹配已结束，已匹配设备均已产生最终升级结果。" : "所有纳入升级范围的设备均已产生最终升级结果。",
      extra: "完成时间：2026-06-12 18:30:22",
      tone: "green",
    },
    "已结束": {
      node: "手动结束",
      text: "任务已被用户提前结束，未处理设备不再继续下发。",
      extra: `结束原因：${detail.endReason}`,
      tone: "gray",
    },
  };
  return map[detail.status] || map["升级中"];
}

function detailExecutionSummary(detail) {
  const stats = metricStats(detail);
  if (isVersionFullDetailMode()) {
    if (detail.status === "已完成") return `已匹配 ${Number(stats.stocked).toLocaleString()} 台，匹配已结束`;
    if (detail.status === "已结束") return `已匹配 ${Number(stats.stocked).toLocaleString()} 台，已停止继续匹配`;
    return `已匹配 ${Number(stats.stocked).toLocaleString()} 台，持续动态匹配符合条件设备`;
  }
  if (isVersionBatchDetailMode()) {
    const plan = plannedBatchTotal();
    if (detail.status === "已结束") return `已匹配 ${Number(stats.stocked).toLocaleString()} / 计划 ${Number(plan).toLocaleString()} 台，剩余名额不再继续匹配`;
    return `已匹配 ${Number(stats.stocked).toLocaleString()} / 计划 ${Number(plan).toLocaleString()} 台`;
  }
  if (detail.status === "已结束") {
    return `执行进度：已处理 ${Number(stats.stocked).toLocaleString()} / ${Number(detail.total).toLocaleString()} 台，未处理设备不再继续下发`;
  }
  return `执行进度：已处理 ${Number(stats.stocked).toLocaleString()} / ${Number(detail.total).toLocaleString()} 台`;
}

function renderTaskFlowOverview(detail) {
  const summary = taskFlowSummary(detail);
  const tabs = [
    ["progress", "任务进度"],
    ["records", "流转明细"],
  ];
  return `
    <section class="task-flow-overview-card ${summary.tone}">
      <div class="task-flow-tabs">
        <div>
          ${tabs.map(([key, label]) => `
            <button class="${state.flowTab === key ? "active" : ""}" type="button" data-action="set-flow-tab" data-tab="${key}">${label}</button>
          `).join("")}
        </div>
      </div>
      ${state.flowTab === "records" ? renderTaskFlowRecords(detail) : renderTaskFlowProgress(detail, summary)}
    </section>
  `;
}

function renderTaskFlowProgress(detail, summary) {
  const nodes = taskFlowNodes(detail);
  return `
    <div class="task-flow-progress-panel">
      <div class="task-flow-stage-line" style="--flow-progress:${taskFlowProgressPercent(nodes)}%">
        ${nodes.map(node => `<span class="${node.type}">${node.type === "done" ? icon("check") : node.type === "error" ? icon("close") : icon(node.icon)}</span>`).join("")}
      </div>
      <div class="task-flow-stage-cards">
        ${taskFlowProgressNodes(detail, summary).map(node => `
          <article class="task-flow-stage-card ${node.type}">
            <span>${node.date}</span>
            <strong>${node.title}</strong>
            <p>${node.desc}</p>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function taskFlowProgressPercent(nodes) {
  const currentIndex = nodes.findIndex(node => ["active", "error", "ended"].includes(node.type));
  const lastDoneIndex = nodes.reduce((lastIndex, node, index) => node.type === "done" ? index : lastIndex, 0);
  const index = currentIndex >= 0 ? currentIndex : lastDoneIndex;
  return nodes.length > 1 ? Math.round((index / (nodes.length - 1)) * 100) : 0;
}

function taskFlowProgressNodes(detail, summary) {
  const nodes = taskFlowNodes(detail);
  const base = [
    { ...nodes[0], date: "06月03日", desc: "创建 OTA 升级任务，完成基础信息与升级策略配置。" },
    { ...nodes[1], date: requiresApprovalForDetail() ? "06月03日" : "06月03日", desc: requiresApprovalForDetail() ? "任务提交至产线负责人审批，等待审批结果。" : "任务发布后进入执行队列。" },
    { ...nodes[2], date: "06月03日", title: requiresApprovalForDetail() ? "审批结果" : "执行队列", desc: requiresApprovalForDetail() ? approvalStageProgressText(detail) : "无需审批，任务进入待执行队列。" },
    { ...nodes[3], date: "06月10日", title: "等待执行", desc: waitingExecutionProgressText(detail) },
    { ...nodes[4], date: "06月10日-06月17日", title: "OTA 下发", desc: otaDispatchProgressText(detail) },
    { ...nodes[5], date: "06月17日", title: "任务结束", desc: taskFinishProgressText(detail) },
  ];
  if (detail.status === "已驳回" || detail.status === "已失效") {
    base[3] = { ...base[3], type: "pending", desc: "任务未生效，不进入执行队列。" };
    base[4] = { ...base[4], type: "pending", desc: "任务未下发。" };
    base[5] = { ...base[5], type: "pending", desc: summary.extra };
  }
  return base;
}

function approvalStageProgressText(detail) {
  if (detail.status === "待审批") return "审批处理中，任务尚未进入执行队列。";
  if (detail.status === "已驳回") return `审批驳回：${detail.rejectReason}`;
  if (detail.status === "已失效") return `审批失效：${detail.invalidReason}`;
  return "审批通过，任务进入待执行队列。";
}

function waitingExecutionProgressText(detail) {
  if (detail.status === "待执行") return `等待到达计划开始时间 ${detail.startAt} 后自动下发。`;
  if (["升级中", "已完成", "已结束"].includes(detail.status)) return "已到达任务开始时间，系统已进入下发链路。";
  return `计划 ${detail.startAt} 自动开始下发。`;
}

function otaDispatchProgressText(detail) {
  if (!["升级中", "已完成", "已结束"].includes(detail.status)) return "尚未到达下发阶段。";
  if (detail.status === "已完成") return "OTA 下发已结束，设备结果已归档。";
  if (detail.status === "已结束") return "执行过程中被提前结束，未处理设备不再继续下发。";
  if (isVersionFullDetailMode()) {
    const stats = metricStats(detail);
    return `执行中，已匹配 ${Number(stats.stocked).toLocaleString()} 台设备。`;
  }
  const stats = metricStats(detail);
  const denominator = isVersionBatchDetailMode() ? plannedBatchTotal() : detail.total;
  return `执行中，已处理 ${Number(stats.stocked).toLocaleString()} / ${Number(denominator).toLocaleString()} 台设备。`;
}

function taskFinishProgressText(detail) {
  if (detail.status === "已完成") return "任务窗口结束后汇总成功、失败与异常设备结果。";
  if (detail.status === "已结束") return detail.endReason;
  if (["已驳回", "已失效"].includes(detail.status)) return "任务未进入 OTA 下发。";
  return "任务窗口结束后汇总成功、失败与异常设备结果。";
}

function renderTaskFlowRecords(detail) {
  return `
    <div class="task-flow-records-panel">
      <h4>流转明细</h4>
      <div class="task-flow-record-list">
        ${taskFlowRecords(detail).map(record => `
          <div class="task-flow-record ${record.type}">
            <span></span>
            <div>
              <strong>${record.title}</strong>
              <p>${record.operator} · ${record.time}</p>
              <em>${record.desc}</em>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function taskFlowRecords(detail) {
  const records = [
    { title: "创建任务", operator: detail.creator, time: detail.createdAt, desc: "创建 OTA 升级任务", type: "done" },
  ];
  if (requiresApprovalForDetail()) {
    records.push({ title: "提交审批", operator: detail.creator, time: detail.submittedAt, desc: "提交至产线负责人审批", type: "done" });
    if (detail.status === "待审批") {
      records.push({ title: "等待审批", operator: detail.approver, time: "-", desc: "等待产线负责人处理", type: "active" });
      return records;
    }
    if (detail.status === "已驳回") {
      records.push({ title: "审批驳回", operator: detail.approver, time: detail.approvedAt, desc: detail.rejectReason, type: "error" });
      return records;
    }
    if (detail.status === "已失效") {
      records.push({ title: "审批失效", operator: "系统", time: "2026-06-04 09:00:00", desc: detail.invalidReason, type: "error" });
      return records;
    }
    records.push({ title: "审批通过", operator: detail.approver, time: detail.approvedAt, desc: "审批通过，任务进入执行队列", type: "done" });
  } else {
    records.push({ title: "发布任务", operator: detail.creator, time: detail.submittedAt, desc: "无需审批，任务进入待执行队列", type: "done" });
  }
  if (detail.status === "待执行") {
    records.push({ title: "等待执行", operator: "系统", time: detail.startAt, desc: "等待到达计划开始时间后自动下发 OTA 指令", type: "active" });
  } else if (["升级中", "已完成", "已结束"].includes(detail.status)) {
    records.push({ title: "开始下发", operator: "系统", time: detail.startAt, desc: "到达任务开始时间，开始下发 OTA 指令", type: "done" });
  }
  if (["升级中", "已完成", "已结束"].includes(detail.status)) {
    records.push({ title: detail.status === "升级中" ? "执行中" : detail.status === "已完成" ? "任务完成" : "任务结束", operator: detail.status === "已结束" ? detail.creator : "系统", time: detail.status === "已结束" ? detail.endedAt : detail.status === "已完成" ? "2026-06-12 18:30:22" : "-", desc: detail.status === "已结束" ? detail.endReason : detail.status === "已完成" ? "任务完成，设备结果已归档" : executionRecordText(detail), type: detail.status === "已结束" ? "ended" : detail.status === "已完成" ? "done" : "active" });
  }
  return records;
}

function executionRecordText(detail) {
  const stats = metricStats(detail);
  if (isVersionFullDetailMode()) return `已匹配 ${Number(stats.stocked).toLocaleString()} 台`;
  const denominator = isVersionBatchDetailMode() ? plannedBatchTotal() : detail.total;
  return `已处理 ${Number(stats.stocked).toLocaleString()} / ${Number(denominator).toLocaleString()} 台`;
}

function taskFlowNodes(detail) {
  const approvalDone = ["待执行", "升级中", "已完成", "已结束"].includes(detail.status);
  const executionStarted = ["升级中", "已完成", "已结束"].includes(detail.status);
  const needsApproval = requiresApprovalForDetail();
  const nodes = [
    { title: "创建任务", desc: "完成任务信息与升级策略配置", type: "done", icon: "log" },
    { title: needsApproval ? "提交审批" : "发布任务", desc: needsApproval ? "提交至产线负责人审批" : "无需审批，发布后进入待执行", type: "done", icon: "users" },
    { title: needsApproval ? "审批结果" : "执行队列", desc: needsApproval ? "等待审批结果" : "进入执行队列", type: needsApproval ? "pending" : "done", icon: needsApproval ? "shield" : "clock" },
    { title: "等待执行", desc: `计划 ${detail.startAt} 自动开始下发`, type: "pending", icon: "clock" },
    { title: "OTA 下发", desc: "系统按策略下发 OTA 指令", type: "pending", icon: "refresh" },
    { title: "任务结束", desc: "汇总最终升级结果", type: "pending", icon: "check" },
  ];

  if (needsApproval) {
    if (detail.status === "待审批") nodes[2] = { ...nodes[2], desc: "等待产线负责人审批", type: "active" };
    if (detail.status === "已驳回") nodes[2] = { ...nodes[2], desc: detail.rejectReason, type: "error" };
    if (detail.status === "已失效") nodes[2] = { ...nodes[2], desc: detail.invalidReason, type: "error" };
    if (approvalDone) nodes[2] = { ...nodes[2], desc: "审批通过，进入待执行", type: "done" };
  }

  if (detail.status === "待执行") {
    nodes[3] = { ...nodes[3], type: "active" };
  } else if (executionStarted) {
    nodes[3] = { ...nodes[3], desc: "已到达任务开始时间", type: "done" };
  }

  if (detail.status === "升级中") {
    nodes[4] = { ...nodes[4], desc: "执行结果持续回传中", type: "active" };
  } else if (detail.status === "已完成") {
    nodes[4] = { ...nodes[4], desc: "OTA 下发已结束", type: "done" };
    nodes[5] = { ...nodes[5], desc: isVersionFullDetailMode() ? "动态匹配已结束，已匹配设备已有最终结果" : "所有纳入设备已有最终结果", type: "done" };
  } else if (detail.status === "已结束") {
    nodes[4] = { ...nodes[4], desc: "执行过程中被提前结束", type: "ended", icon: "close" };
    nodes[5] = { ...nodes[5], desc: detail.endReason, type: "ended", icon: "close" };
  }

  return nodes;
}

function renderExecutionOverview(detail) {
  const stats = metricStats(detail);
  if (!isDetailExecutionStatus(detail)) {
    const label = isVersionFullDetailMode() ? "升级规模" : isVersionBatchDetailMode() ? "计划成功下发数量" : "升级设备总数";
    const value = isVersionFullDetailMode() ? "全量" : isVersionBatchDetailMode() ? `${Number(plannedBatchTotal()).toLocaleString()} 台` : `${Number(detail.total).toLocaleString()} 台`;
    const waitingLabel = requiresApprovalForDetail() ? "当前节点" : "发布状态";
    const waitingValue = requiresApprovalForDetail() ? "等待审批" : "已发布待执行";
    const reasonCard = detail.status === "已驳回"
      ? `<div class="detail-metric red">${icon("close")}<span>驳回原因</span><strong>${detail.rejectReason}</strong></div>`
      : detail.status === "已失效"
        ? `<div class="detail-metric red">${icon("alert")}<span>失效原因</span><strong>${detail.invalidReason}</strong></div>`
        : detail.status === "待执行"
          ? `<div class="detail-metric gray">${icon("clock")}<span>计划开始时间</span><strong>${detail.startAt}</strong></div>`
          : `<div class="detail-metric orange">${icon("shield")}<span>${waitingLabel}</span><strong>${waitingValue}</strong></div>`;
    return `<div class="detail-metrics single"><div class="detail-metric blue">${icon("users")}<span>${label}</span><strong>${value}</strong></div>${reasonCard}</div>`;
  }
  if (isFixedDeviceDetailMode()) {
    return renderFixedDeviceExecutionOverview(detail, stats);
  }
  const cards = executionMetricCards(detail, stats);
  return `
    <div class="detail-metrics">
      ${cards.map(([label, value, tone, iconName]) => `<div class="detail-metric ${tone}">${icon(iconName)}<span>${label}</span><strong>${value}</strong></div>`).join("")}
    </div>
  `;
}

function renderFixedDeviceExecutionOverview(detail, stats) {
  const total = Number(detail.total) || 0;
  const processed = Math.min(stats.stocked, total);
  const unresolved = Math.max(total - processed, 0);
  const percent = total ? Math.min((processed / total) * 100, 100) : 0;
  const successWidth = total ? (stats.upgradeSuccess / total) * 100 : 0;
  const failedWidth = total ? (stats.upgradeFailed / total) * 100 : 0;
  const unresolvedWidth = Math.max(100 - successWidth - failedWidth, 0);
  const sourceLabel = isManualDetailMode() ? "手动导入" : "文件导入";
  const sourceText = isManualDetailMode()
    ? "小批量验证任务，设备总数以手动录入设备为准。"
    : "固定清单任务，设备总数以导入清单为准。";
  const cards = [
    ["升级设备总数", `${Number(total).toLocaleString()} 台`, "blue", "users"],
    ["已处理", `${Number(processed).toLocaleString()} 台`, "blue", "refresh"],
    ["升级成功", `${Number(stats.upgradeSuccess).toLocaleString()} 台`, "green", "check"],
    ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} 台`, "red", "alert"],
    ["未处理", `${Number(unresolved).toLocaleString()} 台`, "gray", "clock"],
  ];
  return `
    <div class="detail-metrics fixed">
      ${cards.map(([label, value, tone, iconName]) => `<div class="detail-metric ${tone}">${icon(iconName)}<span>${label}</span><strong>${value}</strong></div>`).join("")}
    </div>
    <section class="fixed-progress-panel">
      <div class="fixed-progress-head">
        <div>
          <span>${sourceLabel}</span>
          <strong>已处理 ${Number(processed).toLocaleString()} / 总数 ${Number(total).toLocaleString()} 台，完成率 ${percent.toFixed(1)}%</strong>
        </div>
        <p>${sourceText}</p>
      </div>
      <div class="fixed-progress-bar" aria-label="固定清单升级进度">
        <i class="success" style="width:${successWidth.toFixed(2)}%"></i>
        <i class="failed" style="width:${failedWidth.toFixed(2)}%"></i>
        <i class="pending" style="width:${unresolvedWidth.toFixed(2)}%"></i>
      </div>
      <div class="fixed-progress-legend">
        <span><i class="success"></i>成功 ${Number(stats.upgradeSuccess).toLocaleString()} 台</span>
        <span><i class="failed"></i>失败 ${Number(stats.upgradeFailed).toLocaleString()} 台</span>
        <span><i class="pending"></i>未处理 ${Number(unresolved).toLocaleString()} 台</span>
      </div>
    </section>
  `;
}

function renderExecutionProgressInline(detail, stats) {
  const description = isVersionFullDetailMode()
    ? detailExecutionSummary(detail)
    : isVersionBatchDetailMode()
      ? `已处理 ${Number(stats.stocked).toLocaleString()} / 计划 ${Number(plannedBatchTotal()).toLocaleString()} 台`
      : `已处理 ${Number(stats.stocked).toLocaleString()} / ${Number(detail.total).toLocaleString()} 台`;
  const resultText = detail.status === "已结束"
    ? "任务已提前结束，未处理设备不再继续下发"
    : detail.status === "已完成"
      ? "任务已完成，设备结果已归档"
      : "执行中，设备结果持续回传";
  return `
    <div class="execution-progress-panel">
      <div>
        <span>执行状态</span>
        <strong>${description}</strong>
      </div>
      <p>${resultText}</p>
    </div>
  `;
}

function executionMetricCards(detail, stats) {
  if (isVersionFullDetailMode()) {
    return [
      ["已匹配数", `${Number(stats.stocked).toLocaleString()} 台`, "blue", "refresh"],
      ["升级成功", `${Number(stats.upgradeSuccess).toLocaleString()} 台`, "green", "check"],
      ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} 台`, "red", "alert"],
    ];
  }
  if (isVersionBatchDetailMode()) {
    return [
      ["已匹配数", `${Number(stats.stocked).toLocaleString()} 台`, "blue", "refresh"],
      ["升级成功", `${Number(stats.upgradeSuccess).toLocaleString()} 台`, "green", "check"],
      ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} 台`, "red", "alert"],
    ];
  }
  return [
    ["已处理数", `${Number(stats.stocked).toLocaleString()} 台`, "blue", "refresh"],
    ["升级成功", `${Number(stats.upgradeSuccess).toLocaleString()} 台`, "green", "check"],
    ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} 台`, "red", "alert"],
  ];
}

function renderExceptionSummary(detail) {
  if (!detail.failed) {
    return "";
  }
  const rows = exceptionCategoryRows(detail);
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  return `
    <div class="section-title-row exception-title-row">
      <h3 class="section-title">${icon("alert")}异常分类</h3>
      <button class="btn" type="button" data-action="download-exception">${icon("download")}下载异常明细</button>
    </div>
    <section class="exception-chart-card">
      <div class="exception-donut-wrap">
        <div class="exception-echart">
          <div class="exception-echart-canvas" data-exception-chart="${escapeHtml(JSON.stringify(rows))}" aria-label="异常分类圆角环形图"></div>
          <div class="exception-donut-center">
            <span data-exception-center-label data-default="异常总数">异常总数</span>
            <strong data-exception-center-value data-default="${Number(total).toLocaleString()} 台">${Number(total).toLocaleString()} 台</strong>
            <em data-exception-center-percent data-default="全部异常">全部异常</em>
          </div>
        </div>
      </div>
      <div class="exception-rank-list">
        ${rows.map((row, index) => renderExceptionRankItem(row, total, index)).join("")}
      </div>
    </section>
  `;
}

function exceptionCategoryRows(detail) {
  const total = Number(detail.failed) || 0;
  if (!total) return [];
  const ratios = [
    { label: "设备升级过程失败", ratio: 0.36, tone: "red" },
    { label: "升级前不满足条件", ratio: 0.22, tone: "orange" },
    { label: "升级数量限制", ratio: 0.1, tone: "blue" },
    { label: "任务和链路异常", ratio: 0.16, tone: "purple" },
    { label: "App 主动升级相关", ratio: 0.06, tone: "gray" },
    { label: "设备上报失败信息", ratio: 0.1, tone: "cyan" },
  ];
  let remaining = total;
  const rows = ratios.map((item, index) => {
    const count = index === ratios.length - 1
      ? remaining
      : Math.min(Math.max(Math.round(total * item.ratio), total >= ratios.length ? 1 : 0), remaining);
    remaining -= count;
    return { ...item, count };
  });
  return rows.filter(row => row.count > 0);
}

function renderExceptionRankItem(row, total, index) {
  const percent = total ? (row.count / total) * 100 : 0;
  const percentText = `${percent.toFixed(1)}%`;
  return `
    <div class="exception-rank-item ${row.tone}" tabindex="0" data-exception-index="${index}" data-label="${escapeHtml(row.label)}" data-count="${Number(row.count).toLocaleString()} 台" data-percent="${percentText}">
      <div class="exception-rank-head">
        <span>${row.label}</span>
        <strong>${Number(row.count).toLocaleString()} 台</strong>
        <em>${percentText}</em>
      </div>
      <div class="exception-rank-bar"><b style="width:${percent.toFixed(2)}%"></b></div>
    </div>
  `;
}

function renderDeviceDetailTable(detail) {
  const keyword = state.detailDeviceKeyword.trim().toLowerCase();
  const rowModels = deviceDetailRows(detail);
  const filteredRows = keyword
    ? rowModels.filter(row => row.id.toLowerCase().includes(keyword))
    : rowModels;
  const rows = filteredRows.length
    ? filteredRows.map(renderDeviceDetailRow).join("")
    : `<tr class="empty-row"><td colspan="9">暂无符合条件的设备</td></tr>`;
  return `
    <div class="section-title-row">
      <h3 class="section-title">${icon("layer")}设备列表</h3>
    </div>
    <div class="toolbar device-list-toolbar">
      <label class="field-control search">${icon("search")}<input type="search" value="${escapeHtml(state.detailDeviceKeyword)}" placeholder="请输入设备ID" aria-label="设备ID搜索" data-detail-device-search /></label>
      <button class="btn" type="button" data-action="export-device-list">${icon("download")}导出设备列表</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>设备ID</th><th>源版本</th><th>目标版本</th><th>所属大区</th><th>下发状态</th><th>升级状态</th><th>完成时间</th><th>失败原因</th><th>最近上报时间</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function deviceDetailRows(detail) {
  return deviceRows.slice(0, deviceDetailRowLimit(detail)).map((id, index) => buildDeviceDetailRow(detail, id, index));
}

function deviceDetailRowLimit(detail) {
  if (isManualDetailMode()) return Math.min(Number(detail.total) || 2, deviceRows.length);
  if (isVersionFullDetailMode() && detail.status === "已结束") return Math.min(8, deviceRows.length);
  return deviceRows.length;
}

function renderDeviceDetailNote(detail) {
  const note = isVersionFullDetailMode()
    ? detail.status === "已结束"
      ? "指定版本全量任务已停止继续动态匹配；升级明细展示已匹配并进入下发链路的设备，以及提前结束后未继续下发的设备。"
      : "指定版本全量任务无法提前统计设备总数；升级明细展示已动态匹配并进入下发链路的设备。"
    : isVersionBatchDetailMode()
      ? `指定版本批量任务按计划成功下发数量控制名额，当前计划 ${Number(plannedBatchTotal()).toLocaleString()} 台。`
      : "文件/手动导入任务设备清单固定，升级明细展示已纳入本次升级的设备。";
  return `<div class="detail-inline-note">${icon("info")}${note}</div>`;
}

function buildDeviceDetailRow(detail, id, index) {
  const sample = deviceDetailSampleCounts(detail);
  const failed = index < sample.failedCount;
  const success = !failed && index - sample.failedCount < sample.successCount;
  const terminated = detail.status === "已结束" && !failed && !success;
  const dispatchStatus = terminated
    ? "未继续下发"
    : isVersionFullDetailMode()
      ? "动态匹配后下发"
      : "已下发";
  const upgradeStatus = terminated ? statusTag("已终止") : failed ? statusTag("异常") : statusTag(success ? "已完成" : detail.status === "已完成" ? "已完成" : "升级中");
  const finishedAt = success || failed ? "2026-06-10 11:32:18" : "-";
  const reason = terminated ? "任务已提前结束，未进入下发链路" : failed ? "设备离线，升级状态未回传" : "-";
  const reportedAt = terminated ? "-" : "2026-06-10 11:35:22";
  return {
    id,
    sourceVersion: `23.110.105.${index % 2 ? "46" : "43"}`,
    targetVersion: detail.targetVersion,
    region: detail.region,
    dispatchStatus,
    upgradeStatus,
    finishedAt,
    reason,
    reportedAt,
  };
}

function renderDeviceDetailRow(row) {
  return `<tr><td>${row.id}</td><td>${row.sourceVersion}</td><td>${row.targetVersion}</td><td>${row.region}</td><td>${row.dispatchStatus}</td><td>${row.upgradeStatus}</td><td>${row.finishedAt}</td><td>${row.reason}</td><td>${row.reportedAt}</td></tr>`;
}

function deviceDetailSampleCounts(detail) {
  const totalRows = deviceDetailRowLimit(detail);
  const failedCount = Math.min(Number(detail.failed) || 0, 3, totalRows);
  const availableRows = Math.max(totalRows - failedCount, 0);
  const sampleSuccessCap = isManualDetailMode() ? availableRows : detail.status === "已结束" ? 5 : 4;
  const reserveOpenRow = ["升级中", "已结束"].includes(detail.status) && Number(detail.running || detail.pending || 0) > 0 ? 1 : 0;
  const successCount = Math.min(
    Number(detail.success) || 0,
    sampleSuccessCap,
    Math.max(availableRows - reserveOpenRow, 0),
  );
  return { failedCount, successCount };
}

function renderLogPage(title, rows) {
  return `
    <section class="page">
      ${renderPageHeader(title)}
      <div class="toolbar">
        <label class="field-control date-range">
          ${icon("clock")}
          <input placeholder="开始日期时间" aria-label="开始日期时间" />
          <span class="date-split">至</span>
          <input placeholder="结束日期时间" aria-label="结束日期时间" />
        </label>
        <button class="btn primary" data-action="query">查询</button>
        <button class="btn" data-action="reset">重置</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>操作时间</th><th>操作人</th><th>操作模块</th><th>操作动作</th><th>事件描述</th></tr></thead>
          <tbody>${rows.map(row => `<tr>${row.map(cell => `<td title="${cell}">${cell}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(title === "操作日志" ? 34 : 12, title === "操作日志" ? 2 : 1)}
    </section>
  `;
}

function renderApprovalLog() {
  return `
    <section class="page">
      ${renderPageHeader("审批日志")}
      <div class="toolbar">
        <label class="field-control search">
          ${icon("search")}
          <input placeholder="请输入任务名称，按enter搜索" aria-label="审批任务搜索" />
        </label>
        <button class="btn primary" data-action="query">查询</button>
        <button class="btn" data-action="reset">重置</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>审批时间</th><th>任务名称</th><th>操作人</th><th>审批动作</th><th>任务状态</th><th>审批描述</th></tr></thead>
          <tbody>${approvalLogs.map(row => `<tr>${row.map(cell => `<td title="${cell}">${cell}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(12, 1)}
    </section>
  `;
}

function renderUserList() {
  return `
    <section class="page">
      ${renderPageHeader("用户列表")}
      <div class="toolbar">
        <label class="field-control search">
          ${icon("search")}
          <input placeholder="请输入用户账号名称，按enter搜索" aria-label="用户搜索" />
        </label>
        <button class="btn primary" data-action="query">查询</button>
        <button class="btn" data-action="reset">重置</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>账号名称</th><th>关联角色</th><th>所属产线</th><th>创建时间</th><th>操作</th></tr></thead>
          <tbody>${users.map(row => `
            <tr>
              ${row.map(cell => `<td>${cell}</td>`).join("")}
              <td>
                <button class="link-btn" data-route="user-detail">详情</button>
                <button class="link-btn" data-route="user-permission">权限配置</button>
              </td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
      ${pagination(80, 4)}
    </section>
  `;
}

function renderUserPermission() {
  return `
    <section class="page">
      ${renderPageHeader("用户列表-配置权限", { back: "user-list" })}
      <div class="blue-panel">
        <div class="detail-hero">
          <div class="detail-title">严国潮 <span class="mini-tag blue">系统管理员</span></div>
          <dl class="detail-item"><dt>所属产线:</dt><dd>IPC</dd></dl>
          <dl class="detail-item"><dt>创建时间:</dt><dd>2025-12-24 14:48:27</dd></dl>
          <dl class="detail-item"><dt>关联角色:</dt><dd>系统管理员、默认人员</dd></dl>
        </div>
        <h3 class="section-title">权限配置</h3>
        ${permissionTable(true)}
        <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: flex-end">
          <button class="btn" data-route="user-list">取消</button>
          <button class="btn primary" data-action="save-user-permission">保存</button>
        </div>
      </div>
    </section>
  `;
}

function renderUserDetail() {
  return `
    <section class="page">
      ${renderPageHeader("用户列表-详情", { back: "user-list" })}
      <div class="blue-panel">
        <div class="detail-hero">
          <div class="detail-title">严国潮 <span class="mini-tag blue">系统管理员</span></div>
          <dl class="detail-item"><dt>所属产线:</dt><dd>IPC</dd></dl>
          <dl class="detail-item"><dt>创建时间:</dt><dd>2025-12-24 14:48:27</dd></dl>
          <dl class="detail-item"><dt>账号状态:</dt><dd>正常</dd></dl>
        </div>
        <h3 class="section-title">关联角色</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>角色名称</th><th>关联用户数</th><th>备注</th></tr></thead>
            <tbody>${roles.slice(0, 2).map(role => `<tr><td>${role.name}</td><td>${role.count}</td><td>${role.note}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function renderRolePage(forcePermission) {
  const current = roles.find(role => role.name === state.role) || roles[0];
  return `
    <section class="page">
      ${renderPageHeader(forcePermission ? "配置权限" : "角色权限", {
        back: forcePermission ? "role-list" : "",
        actions: forcePermission
          ? `<button class="btn" data-route="role-list">取消</button><button class="btn primary" data-action="save-role-permission">保存权限</button>`
          : `<button class="btn primary" type="button" data-action="open-role-create">${icon("plus")}新增角色</button>`,
      })}
      <div class="split-shell">
        <aside class="role-sidebar">
          <h2>角色列表</h2>
          ${roles.map(role => `
            <button class="role-row ${state.role === role.name ? "active" : ""}" data-role="${role.name}" type="button">
              <span>${role.name}</span>
              ${role.default ? `<span class="mini-tag green">默认</span>` : ""}
            </button>
          `).join("")}
        </aside>
        <div class="role-content">
          <div class="role-hero">
            <h2>${current.name}</h2>
            <div class="role-meta">
              <span><span class="text-muted">创建时间：</span>2025-12-24 14:48:27</span>
              <span><span class="text-muted">关联用户数：</span>${current.count}</span>
              <span><span class="text-muted">备注：</span>${current.note}</span>
            </div>
          </div>
          ${forcePermission ? "" : `<div class="inline-actions"><button class="btn primary" data-route="role-permission">${icon("settings")}配置权限</button><button class="btn" data-action="delete-role">删除角色</button></div>`}
          <div class="tabs" role="tablist">
            <button class="tab-btn ${state.roleTab === "permissions" ? "active" : ""}" type="button" data-tab="permissions">角色权限</button>
            <button class="tab-btn ${state.roleTab === "users" ? "active" : ""}" type="button" data-tab="users">关联用户</button>
          </div>
          ${state.roleTab === "users" ? renderRoleUsers() : `<h3 class="section-title">角色权限</h3>${permissionTable(false)}`}
        </div>
      </div>
    </section>
  `;
}

function renderRoleUsers() {
  return `
    <h3 class="section-title">关联用户</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>账号名称</th><th>所属产线</th><th>创建时间</th></tr></thead>
        <tbody>${users.slice(0, 6).map(row => `<tr><td>${row[0]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function permissionTable(editable) {
  const disabled = editable ? "" : "disabled";
  return `
    <table class="permission-table">
      <thead><tr><th style="width: 180px">菜单</th><th style="width: 260px">页面</th><th>功能操作权限</th></tr></thead>
      <tbody>
        <tr>
          <td>${permissionLabel("OTA升级", disabled)}</td>
          <td>${permissionLabel("任务列表", disabled)}</td>
          <td><div class="permission-group">
            ${permissionLabel("查看OTA任务列表", disabled)}
            ${permissionLabel("查看OTA任务详情", disabled)}
            ${permissionLabel("新增OTA任务", disabled)}
            ${permissionLabel("编辑OTA任务", disabled)}
            ${permissionLabel("发布OTA任务", disabled)}
            ${permissionLabel("中止OTA任务", disabled)}
            ${permissionLabel("删除OTA任务", disabled)}
          </div></td>
        </tr>
        <tr>
          <td rowspan="2">${permissionLabel("日志管理", disabled)}</td>
          <td>${permissionLabel("操作日志", disabled)}</td>
          <td>${permissionLabel("查看操作日志", disabled)}</td>
        </tr>
        <tr>
          <td>${permissionLabel("审批日志", disabled)}</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2">${permissionLabel("用户角色", disabled)}</td>
          <td>${permissionLabel("用户列表", disabled)}</td>
          <td><div class="permission-group">${permissionLabel("查看用户列表", disabled)}${permissionLabel("更新用户", disabled)}</div></td>
        </tr>
        <tr>
          <td>${permissionLabel("角色权限", disabled)}</td>
          <td><div class="permission-group">${permissionLabel("新增角色", disabled)}${permissionLabel("更新角色", disabled)}${permissionLabel("更新角色权限", disabled)}${permissionLabel("删除角色", disabled)}</div></td>
        </tr>
      </tbody>
    </table>
  `;
}

function permissionLabel(text, disabled) {
  return `
    <label class="checkbox-line">
      <input type="checkbox" checked ${disabled} />
      <span>${text}</span>
    </label>
  `;
}

function pagination(total, pages, options = {}) {
  const page = Math.min(Math.max(Number(options.page || 1), 1), pages);
  const pageSize = Number(options.pageSize || 20);
  const scope = options.scope || "default";
  const visiblePages = pageWindow(page, pages);
  return `
    <div class="pagination" aria-label="分页">
      <span>共 ${total} 条</span>
      <button class="page-size" type="button" data-action="change-page-size" data-scope="${scope}">${pageSize}条/页 ${icon("chevron")}</button>
      <button class="page-btn" type="button" aria-label="上一页" data-action="change-page" data-scope="${scope}" data-page="${page - 1}" ${page <= 1 ? "disabled" : ""}>‹</button>
      ${visiblePages.map(item => item === "..."
        ? `<span class="page-ellipsis">...</span>`
        : `<button class="page-btn ${item === page ? "active" : ""}" type="button" data-action="change-page" data-scope="${scope}" data-page="${item}">${item}</button>`
      ).join("")}
      <button class="page-btn" type="button" aria-label="下一页" data-action="change-page" data-scope="${scope}" data-page="${page + 1}" ${page >= pages ? "disabled" : ""}>›</button>
      <span>前往</span>
      <input class="page-input" value="${page}" aria-label="页码" data-page-jump data-scope="${scope}" data-pages="${pages}" />
      <span>页</span>
    </div>
  `;
}

function pageWindow(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, index) => index + 1);
  const items = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(pages - 1, page + 1);
  if (start > 2) items.push("...");
  for (let i = start; i <= end; i += 1) items.push(i);
  if (end < pages - 1) items.push("...");
  items.push(pages);
  return items;
}

function renderPortal() {
  const portal = document.getElementById("portal");
  const modal = state.modal ? renderModal(state.modal) : "";
  const toast = state.toast ? `<div class="toast" role="status">${icon("check")} ${state.toast}</div>` : "";
  portal.innerHTML = `${modal}${toast}`;
  bindEvents(portal);
}

function renderModal(modal) {
  if (modal.type === "preview") return renderPreviewModal();
  if (modal.type === "publishResult") return renderPublishResultModal();
  if (modal.type === "region") return renderRegionModal();
  if (modal.type === "status") return renderStatusModal();
  if (modal.type === "roleCreate") return renderRoleCreateModal();
  if (modal.type === "confirmEnd") return renderConfirmEndModal();
  if (modal.type === "strategyDetail") return renderStrategyDetailModal();
  return "";
}

function renderPreviewModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal large" role="dialog" aria-modal="true" aria-labelledby="previewTitle" data-stop>
        <header class="modal-header">
          <span id="previewTitle">任务配置预览</span>
          <button class="modal-close" data-action="close-modal" aria-label="关闭">${icon("close")}</button>
        </header>
        <div class="modal-body">
          <div class="preview-modal-switch">${renderPreviewScenarioSwitch()}</div>
          ${renderPreviewContent(false)}
        </div>
        <footer class="modal-footer">
          <button class="btn" data-action="close-modal">取消</button>
          ${renderPublishButton()}
        </footer>
      </section>
    </div>
  `;
}

function renderPublishResultModal() {
  const meta = strategyMeta[state.strategy];
  const isManual = state.strategy === "manual";
  const isSync = state.strategy === "version" && state.taskScope === "sync";
  const taskStatus = isManual ? manualPublishStatus() : meta.nextStatus;
  const title = isManual ? "任务发布成功" : "任务已提交审批";
  const desc = isManual
    ? "OTA 升级任务已创建，系统将在任务时间窗口内执行。"
    : isSync
      ? "跨大区同步任务已创建并提交统一审批，审批通过后会在各目标大区生成本地任务。"
      : "OTA 升级任务已创建并提交审批，审批通过后将在任务时间窗口内执行。";
  const flowNotes = isManual
    ? [
      ["当前状态", taskStatus === "升级中" ? "任务已到达开始时间，进入升级中。" : "任务已进入待执行，未到开始时间前不会下发。", "clock"],
      ["执行规则", "到达任务开始时间后系统自动下发 OTA；执行结果可在任务详情的升级明细中查看。", "refresh"],
      ["后续操作", "关闭弹窗或返回任务列表后，可通过任务详情持续查看任务流转与设备升级结果。", "info"],
    ]
    : isSync ? [
      ["当前状态", "任务已进入待审批，审批通过前不会生成各大区本地执行任务。", "shield"],
      ["同步规则", "升级包在各大区保持一致，审批通过后按所选父级大区自动生成本地任务。", "refresh"],
      ["查看方式", "列表和详情仍按顶部大区分别查看；切换到中国区时可查看子节点统计。", "info"],
    ] : [
      ["当前状态", "任务已进入待审批，审批通过前不会进入执行队列，也不会下发 OTA。", "shield"],
      ["审批结果", "审批通过后按任务时间进入待执行或升级中；若审批驳回或超时失效，任务不会下发。", "clock"],
      ["后续操作", "关闭弹窗或返回任务列表后，可在待审批任务中查看详情，等待产线负责人处理。", "info"],
    ];
  const syncRegions = isSync && state.syncRegions.length
    ? state.syncRegions.map(region => `<span class="mini-tag blue">${region}</span>`).join("")
    : "";
  const executionRegions = !isSync ? renderMiniRegionTags(currentExecutionRegions()) : "";

  return `
    <div class="modal-backdrop" data-action="publish-result-list">
      <section class="modal medium publish-result-modal" role="dialog" aria-modal="true" aria-labelledby="publishResultTitle" data-stop>
        <header class="modal-header">
          <span id="publishResultTitle">${title}</span>
          <button class="modal-close" data-action="publish-result-list" aria-label="关闭并返回任务列表">${icon("close")}</button>
        </header>
        <div class="modal-body">
          <div class="publish-result-head">
            <div class="publish-result-icon">${icon("check")}</div>
            <div>
              <h3>${title}</h3>
              <p>${desc}</p>
            </div>
          </div>
          <dl class="publish-result-grid">
            <dt>任务编号</dt><dd><code>OTA-2026-176660</code></dd>
            <dt>任务名称</dt><dd>${escapeHtml(state.form.taskName || "未命名任务")}</dd>
            <dt>升级方式</dt><dd>${meta.short}</dd>
            <dt>升级包</dt><dd>${state.packageType === "whole" ? "整包" : "差分包"}</dd>
            <dt>目标版本</dt><dd>${escapeHtml(state.form.targetVersion)}</dd>
            <dt>任务时间</dt><dd>${escapeHtml(state.taskStartAt)} ~ ${escapeHtml(state.taskEndAt)}</dd>
            ${isSync ? `<dt>同步目标大区</dt><dd class="preview-tag-list">${syncRegions}</dd>` : `<dt>当前大区执行范围</dt><dd class="preview-tag-list">${executionRegions}</dd>`}
            <dt>设备规模</dt><dd>${finishDeviceScaleText()}</dd>
            <dt>当前状态</dt><dd>${statusTag(taskStatus)}</dd>
          </dl>
          <div class="publish-flow-note" aria-label="后续流程说明">
            <h4>后续流程说明</h4>
            <div class="publish-flow-list">
              ${flowNotes.map(([label, text, iconName]) => `
                <div class="publish-flow-item">
                  <span class="publish-flow-icon">${icon(iconName)}</span>
                  <div>
                    <strong>${label}</strong>
                    <p>${text}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
        <footer class="modal-footer">
          <button class="btn" type="button" data-action="publish-result-list">返回任务列表</button>
          <button class="btn primary" type="button" data-action="publish-result-detail">查看任务详情</button>
        </footer>
      </section>
    </div>
  `;
}

function manualPublishStatus() {
  const start = parseDateTime(state.taskStartAt);
  return start <= new Date() ? "升级中" : "待执行";
}

function previewData() {
  const meta = strategyMeta[state.strategy];
  if (state.strategy === "version") {
    const isSync = state.taskScope === "sync";
    return {
      bad: 0,
      good: 0,
      total: 0,
      alertClass: "success",
      alertTitle: isSync ? "跨大区指定版本同步任务待提交审批" : "指定版本升级任务待提交审批",
      alertText: isSync
        ? "请确认同步目标大区、升级包和源版本范围；审批通过后将分别生成各大区本地任务。"
        : "请确认升级包、源版本范围、任务大区和策略条件；审批通过后进入执行窗口。",
      action: "提交审批",
      disabled: false,
    };
  }
  const diffPenalty = state.packageType === "diff" && state.strategy !== "manual" ? 418 : 0;
  const scenario = {
    mixed: { bad: Math.max(meta.bad + diffPenalty, 2), good: Math.max(meta.good - diffPenalty, 1), alertClass: "warn", alertTitle: "检测到部分设备不符合发布条件", alertText: "可过滤异常设备后继续发布可升级设备", action: state.strategy === "manual" ? "过滤异常并发布" : "过滤异常并提交审批", disabled: false },
    blocked: { bad: meta.devices, good: 0, alertClass: "error", alertTitle: "无法发布OTA升级任务", alertText: "不存在可升级设备，不支持发布任务", action: "无法发布", disabled: true },
    clean: { bad: 0, good: meta.devices, alertClass: "success", alertTitle: "预检通过", alertText: state.strategy === "manual" ? "全部设备可升级，可正常发布" : "全部设备可升级，发布后需走审批流程", action: state.strategy === "manual" ? "立即发布" : "提交审批", disabled: false },
  }[state.previewScenario];
  return { ...scenario, total: meta.devices };
}

function renderPreviewVersionRange() {
  if (state.strategy !== "version") return "-";
  const selectedSet = new Set(state.selectedVersions);
  const rows = firmwareVersions
    .filter(item => selectedSet.has(item.version) && !(state.packageType === "diff" && !item.diffReady))
    .map(item => {
      const deviceCount = state.quantityMode === "full" ? "全量" : `${Number(state.batchQuantity || 0).toLocaleString()} 台`;
      return `
        <tr>
          <td>${item.version}</td>
          <td>${deviceCount}</td>
        </tr>
      `;
    }).join("");

  if (!rows) return `<span class="empty-inline">未选择源版本</span>`;

  return `
    <div class="preview-version-scope">
      <div class="preview-version-head">
        <span>已选源版本</span>
        <strong>${state.selectedVersions.length} 个</strong>
      </div>
      <table class="preview-version-table">
        <thead>
          <tr>
            <th>源版本号</th>
            <th>升级设备数</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderPreviewStrategyNote() {
  if (state.strategy !== "version") return "";

  const quantityText = state.quantityMode === "full"
    ? "全量任务在执行期按源版本、区域和策略条件动态匹配设备，预览阶段不统计固定设备总数，实际设备数以执行结果为准。"
    : state.taskScope === "sync"
      ? "批量任务按每个目标大区各自使用统一计划数量执行，不做跨大区总量汇总。"
      : "批量任务使用统一计划成功下发数量，系统会在选定源版本和区域内持续匹配符合条件设备。";
  const scopeText = state.taskScope === "sync"
    ? "跨大区同步只保证统一创建与配置一致性，升级包各大区一致；任务列表和详情仍按顶部大区分别查看。"
    : "当前大区任务只在当前顶部大区及所选节点内执行。";
  const text = `${quantityText}${scopeText}`;

  return `<div class="suggestion preview-strategy-note">${icon("info")} ${text}</div>`;
}

function renderPreviewCards(data) {
  return `
    <div class="preview-cards">
      <div class="preview-card blue"><span>选定设备总数</span><strong>${data.total}</strong></div>
      <div class="preview-card green"><span>可升级设备数</span><strong>${data.good}</strong></div>
      <div class="preview-card orange"><span>不可升级设备数</span><strong>${data.bad}</strong></div>
    </div>
  `;
}

function shouldShowPreviewExceptions() {
  return state.previewScenario !== "clean" && state.strategy !== "version";
}

function renderPreviewContent(compact) {
  const meta = strategyMeta[state.strategy];
  const data = previewData();
  const exceptions = shouldShowPreviewExceptions();
  const isSync = isSyncCreateTask();
  const regionContent = renderMiniRegionTags(currentExecutionRegions());
  const taskScopeText = isSync ? "跨大区同步" : "当前大区";
  return `
    <div class="preview-alert ${data.alertClass}">
      ${icon(data.alertClass === "success" ? "check" : "alert")}
      <div><strong>${data.alertTitle}</strong><br /><span>${data.alertText}</span></div>
    </div>
    <div class="preview-layout ${compact ? "compact" : ""}">
      <div class="modal-section preview-wide-section">
        <h3>基本信息</h3>
        <div class="info-grid preview-basic-grid">
          <dl>
            <dt>任务名称：</dt><dd>${state.form.taskName || "-"}</dd>
            <dt>目标固件版本：</dt><dd><button class="link-btn">${state.form.targetVersion || "-"}</button></dd>
            <dt>${isSync ? "同步目标大区：" : "当前大区执行范围："}</dt><dd class="preview-tag-list">${regionContent}</dd>
            <dt>任务起止时间：</dt><dd>${state.taskStartAt || "-"} ~ ${state.taskEndAt || "-"}</dd>
            <dt>升级说明：</dt><dd class="preview-wide-value">${state.form.upgradeDesc || "-"}</dd>
          </dl>
        </div>
      </div>
      <div class="modal-section preview-wide-section">
        <h3>升级策略</h3>
        ${renderPreviewStrategyNote()}
        <div class="info-grid preview-strategy-grid">
          <dl>
            <dt>升级包：</dt><dd><span class="mini-tag blue">${state.packageType === "whole" ? "整包" : "差分包"}</span></dd>
            <dt>升级策略：</dt><dd>${meta.title}</dd>
            <dt>任务范围：</dt><dd>${taskScopeText}</dd>
            <dt>升级数量：</dt><dd>${state.quantityMode === "full" ? "全量" : "批量"}</dd>
            <dt>审批流程：</dt><dd>${state.strategy === "manual" ? "无需审批" : "需产线负责人审批"}</dd>
            <dt class="preview-version-label">版本范围：</dt><dd class="preview-version-cell">${renderPreviewVersionRange()}</dd>
          </dl>
        </div>
      </div>
      ${state.strategy !== "version" ? `<div class="modal-section preview-wide-section">
        <h3>任务预览</h3>
        ${renderPreviewCards(data)}
      </div>` : ""}
      ${exceptions ? `
        <div class="modal-section preview-wide-section">
          <h3 style="border-left-color: var(--orange); color: var(--orange)">异常分类明细</h3>
          <div class="exception-list">
            <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>已是目标版本：设备当前版本与目标固件版本一致</span><span class="mini-tag">${state.previewScenario === "blocked" ? Math.ceil(data.bad * 0.42) : Math.min(data.bad, 2)}台</span></div>
            <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>${state.packageType === "diff" ? "无可用差分包：源版本未匹配差分基线" : "设备不在当前大区执行范围或机型不匹配"}</span><span class="mini-tag">${state.previewScenario === "blocked" ? Math.floor(data.bad * 0.58) : Math.max(data.bad - 2, 0)}台</span></div>
          </div>
          <div class="suggestion">${icon("info")} 建议下载异常明细排查；存在部分可升级时，可过滤异常设备后继续发布。</div>
          <button class="btn" type="button" data-action="download-exception" style="margin-top: 12px">${icon("download")}下载异常文件明细</button>
        </div>
      ` : ""}
      </div>
  `;
}

function renderPublishButton() {
  const data = previewData();
  return `<button class="btn primary" ${data.disabled ? "disabled title='无符合条件的设备，无法发布'" : ""} data-action="publish-task">${data.action}</button>`;
}

function renderRegionModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal medium" role="dialog" aria-modal="true" aria-labelledby="regionTitle" data-stop>
        <header class="modal-header"><span id="regionTitle">切换顶部大区</span><button class="modal-close" data-action="close-modal">${icon("close")}</button></header>
        <div class="modal-body">
          <div class="region-picker-panel">
            <div class="region-picker-toolbar">
              <span class="text-muted">当前顶部大区：${state.topRegion}</span>
            </div>
            <div class="region-option-list">
              ${topRegionOptions.map(region => `
                <label class="region-option ${state.topRegion === region ? "checked" : ""}" data-action="set-top-region" data-region="${region}">
                  <input type="radio" name="topRegion" ${state.topRegion === region ? "checked" : ""} />
                  <span>${region}</span>
                </label>
              `).join("")}
            </div>
            <div class="suggestion">${icon("info")} 顶部大区只影响列表和详情查询上下文；新增任务的执行范围只能在当前顶部大区内选择。</div>
          </div>
        </div>
        <footer class="modal-footer">
          <button class="btn" data-action="close-modal">取消</button>
          <button class="btn primary" data-action="confirm-region">确定</button>
        </footer>
      </section>
    </div>
  `;
}

function renderStatusModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal medium" role="dialog" aria-modal="true" aria-labelledby="statusTitle" data-stop>
        <header class="modal-header"><span id="statusTitle">任务状态筛选</span><button class="modal-close" data-action="close-modal">${icon("close")}</button></header>
        <div class="modal-body">
          <div class="permission-group">
            ${["全部", ...Object.keys(taskStatusMeta)].map(label => `<button class="chip" data-action="choose-status">${label}</button>`).join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderRoleCreateModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal medium" role="dialog" aria-modal="true" aria-labelledby="roleCreateTitle" data-stop>
        <header class="modal-header"><span id="roleCreateTitle">新增角色</span><button class="modal-close" data-action="close-modal">${icon("close")}</button></header>
        <div class="modal-body">
          <div class="form-shell" style="padding-bottom: 0">
            <div class="form-row" style="grid-template-columns: 120px 1fr"><label class="form-label"><span class="required">*</span> 角色名称</label><input class="input" placeholder="请输入角色名称" /></div>
            <div class="form-row" style="grid-template-columns: 120px 1fr"><label class="form-label">备注</label><textarea class="textarea" placeholder="请输入备注"></textarea></div>
          </div>
        </div>
        <footer class="modal-footer">
          <button class="btn" data-action="close-modal">取消</button>
          <button class="btn primary" data-action="create-role">确定</button>
        </footer>
      </section>
    </div>
  `;
}

function renderConfirmEndModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal medium" role="dialog" aria-modal="true" aria-labelledby="endTitle" data-stop>
        <header class="modal-header"><span id="endTitle">结束任务</span><button class="modal-close" data-action="close-modal">${icon("close")}</button></header>
        <div class="modal-body">
          <div class="preview-alert error">${icon("alert")} 当前任务仍有设备待升级，结束后未开始升级的设备将不再收到升级指令。</div>
          <label class="form-label" style="justify-content:flex-start">结束原因</label>
          <textarea class="textarea" placeholder="请输入结束原因"></textarea>
        </div>
        <footer class="modal-footer">
          <button class="btn" data-action="close-modal">取消</button>
          <button class="btn danger" data-action="confirm-end">确认结束</button>
        </footer>
      </section>
    </div>
  `;
}

function renderStrategyDetailModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal medium" role="dialog" aria-modal="true" aria-labelledby="strategyTitle" data-stop>
        <header class="modal-header"><span id="strategyTitle">升级策略详情</span><button class="modal-close" data-action="close-modal">${icon("close")}</button></header>
        <div class="modal-body">
          <div class="info-grid">
            <dl>
              <dt>升级包：</dt><dd>整包</dd>
              <dt>升级策略：</dt><dd>文件导入升级</dd>
              <dt>导入设备：</dt><dd>6505 台</dd>
              <dt>策略条件：</dt><dd>指定地区 = 中国/杭州低功耗</dd>
            </dl>
          </div>
        </div>
      </section>
    </div>
  `;
}

function bindEvents(root) {
  root.querySelectorAll("[data-route]").forEach(el => {
    el.addEventListener("click", event => {
      event.preventDefault();
      setRoute(el.dataset.route);
    });
  });

  root.querySelectorAll("[data-action]").forEach(el => {
    el.addEventListener("click", event => {
      const action = el.dataset.action;
      if (action === "close-modal" && event.target !== el && !el.classList.contains("modal-close") && !el.classList.contains("btn")) return;
      if ([
        "toggle-region",
        "remove-region",
        "select-all-regions",
        "clear-regions",
        "toggle-condition-region",
        "remove-condition-region",
        "select-all-condition-regions",
        "clear-condition-regions",
        "toggle-version",
        "toggle-all-versions",
        "toggle-sync-region",
        "set-top-region",
        "remove-device",
        "clear-date-range",
      ].includes(action)) {
        event.stopPropagation();
      }
      event.preventDefault();
      handleAction(action, el);
    });
  });

  root.querySelectorAll("[data-stop]").forEach(el => {
    el.addEventListener("click", event => event.stopPropagation());
  });

  root.querySelectorAll("[data-task-filter]").forEach(input => {
    if (input.matches("input")) {
      if (input.type === "date") {
        input.addEventListener("change", () => updateTaskFilter(input));
      } else {
        input.addEventListener("input", () => updateTaskFilter(input));
      }
      input.addEventListener("focus", () => {
        if (input.dataset.taskFilter !== "creator") return;
        if (state.taskCreatorDropdownOpen) return;
        state.taskCreatorDropdownOpen = true;
        render({ focusSelector: `[data-task-filter="${input.dataset.taskFilter}"]`, focusSelectionStart: input.selectionStart ?? input.value.length });
      });
    } else {
      input.addEventListener("change", () => updateTaskFilter(input));
    }
  });

  root.querySelectorAll("[data-radio='packageType']").forEach(input => {
    input.addEventListener("change", () => {
      state.packageType = input.value;
      render();
    });
  });

  root.querySelectorAll("[data-radio='quantityMode']").forEach(input => {
    input.addEventListener("change", () => {
      state.quantityMode = input.value;
      if (state.quantityMode === "batch" && state.batchQuantity == null) state.batchQuantity = 0;
      render();
    });
  });

  root.querySelectorAll("[data-radio='taskScope']").forEach(input => {
    input.addEventListener("change", () => {
      state.taskScope = input.value;
      if (state.taskScope === "sync" && !state.syncRegions.length) state.syncRegions = ["中国"];
      if (state.taskScope === "sync") {
        state.conditionRegionEnabled = false;
        state.conditionRegions = [];
      }
      sanitizeRegionState();
      delete state.errors.syncRegions;
      delete state.errors.selectedRegions;
      delete state.errors.conditionRegion;
      render();
    });
  });

  root.querySelectorAll("[data-package-card]").forEach(el => {
    el.addEventListener("click", () => {
      state.packageType = el.dataset.packageCard;
      delete state.errors.strategy;
      render();
    });
  });

  root.querySelectorAll("[data-strategy]").forEach(el => {
    el.addEventListener("click", () => {
      const nextStrategy = el.dataset.strategy;
      if (state.strategy === nextStrategy) return;
      state.strategy = nextStrategy;
      if (state.strategy !== "version") {
        state.taskScope = "current";
        delete state.errors.syncRegions;
      } else if (!state.syncRegions.length) {
        state.syncRegions = ["中国", "香港"];
      }
      sanitizeRegionState();
      state.previewScenario = "mixed";
      delete state.errors.strategy;
      delete state.errors.fileUpload;
      delete state.errors.manualDevices;
      delete state.errors.selectedRegions;
      delete state.errors.conditionRegion;
      showToast("已切换升级方式，当前页仅保留公共任务信息");
      render();
    });
  });

  root.querySelectorAll("[data-preview]").forEach(el => {
    el.addEventListener("click", () => {
      state.previewScenario = el.dataset.preview;
      render();
    });
  });

  root.querySelectorAll("[data-role]").forEach(el => {
    el.addEventListener("click", () => {
      state.role = el.dataset.role;
      render();
    });
  });

  root.querySelectorAll("[data-tab]").forEach(el => {
    el.addEventListener("click", () => {
      state.roleTab = el.dataset.tab;
      render();
    });
  });

  root.querySelectorAll("[data-field]").forEach(input => {
    const isTextControl = input.matches("input, textarea");
    if (isTextControl) {
      input.addEventListener("input", () => updateFormField(input, false));
      input.addEventListener("change", () => updateFormField(input, false));
    } else {
      input.addEventListener("change", () => updateFormField(input, true));
    }
  });

  root.querySelectorAll("[data-manual-device-input]").forEach(input => {
    input.addEventListener("change", () => updateManualDevice(input));
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateManualDevice(input);
      }
    });
  });

  root.querySelectorAll("[data-batch-quantity]").forEach(input => {
    input.addEventListener("change", () => updateBatchQuantity(input));
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateBatchQuantity(input);
      }
    });
  });

  root.querySelectorAll("[data-detail-device-search]").forEach(input => {
    input.addEventListener("input", () => updateDetailDeviceSearch(input));
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateDetailDeviceSearch(input);
      }
    });
  });

  root.querySelectorAll("[data-exception-index]").forEach(el => {
    el.addEventListener("mouseenter", event => focusExceptionItem(el, event));
    el.addEventListener("focus", event => focusExceptionItem(el, event));
    el.addEventListener("mouseleave", () => resetExceptionFocus(el));
    el.addEventListener("blur", () => resetExceptionFocus(el));
  });

  root.querySelectorAll("[data-page-jump]").forEach(input => {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        jumpPage(input);
      }
    });
    input.addEventListener("change", () => jumpPage(input));
  });
}

function focusExceptionItem(item, event) {
  const card = item.closest(".exception-chart-card");
  if (!card) return;
  const chartEl = card.querySelector("[data-exception-chart]");
  const rows = JSON.parse(chartEl?.dataset.exceptionChart || "[]");
  const total = rows.reduce((sum, row) => sum + Number(row.count || 0), 0);
  const index = Number(item.dataset.exceptionIndex);
  focusExceptionByIndex(chartEl, index, rows, total);
  chartEl?.__chart?.dispatchAction({ type: "downplay", seriesIndex: 0 });
  chartEl?.__chart?.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: index });
  chartEl?.__chart?.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: index });
}

function resetExceptionFocus(item) {
  const card = item.closest(".exception-chart-card");
  if (!card) return;
  const chartEl = card.querySelector("[data-exception-chart]");
  chartEl?.__chart?.dispatchAction({ type: "downplay", seriesIndex: 0 });
  chartEl?.__chart?.dispatchAction({ type: "hideTip" });
  resetExceptionChartFocus(chartEl);
}

function focusExceptionByIndex(chartEl, index, rows, total) {
  const card = chartEl?.closest(".exception-chart-card");
  const row = rows[index];
  if (!card || !row) return;
  card.classList.add("is-focusing");
  const percent = total ? ((row.count / total) * 100).toFixed(1) : "0.0";
  card.querySelectorAll("[data-exception-index]").forEach(item => {
    const isActive = Number(item.dataset.exceptionIndex) === index;
    item.classList.toggle("active", isActive);
    item.classList.toggle("muted", !isActive);
  });
  card.querySelector("[data-exception-center-label]").textContent = row.label;
  card.querySelector("[data-exception-center-value]").textContent = `${Number(row.count).toLocaleString()} 台`;
  card.querySelector("[data-exception-center-percent]").textContent = `${percent}%`;
}

function resetExceptionChartFocus(chartEl) {
  const card = chartEl?.closest(".exception-chart-card");
  if (!card) return;
  card.classList.remove("is-focusing");
  card.querySelectorAll("[data-exception-index]").forEach(item => {
    item.classList.remove("active", "muted");
  });
  ["label", "value", "percent"].forEach(key => {
    const el = card.querySelector(`[data-exception-center-${key}]`);
    if (el) el.textContent = el.dataset.default || "";
  });
}

function updateFormField(input, shouldRender = false) {
  const key = input.dataset.field;
  state.form[key] = input.value;
  delete state.errors[key];

  const field = input.closest(".field-stack");
  field?.classList.remove("has-error");
  field?.querySelector(".field-error")?.remove();

  if (key === "taskName" || key === "upgradeDesc") {
    const counter = field?.querySelector(".count");
    if (counter) counter.textContent = `${input.value.length} / ${input.maxLength || (key === "upgradeDesc" ? 500 : 64)}`;
  }

  if (shouldRender) render();
}

function updateBatchQuantity(input) {
  state.batchQuantity = Math.max(0, Number(input.value || 0));
  if (state.batchQuantity > 0) delete state.errors.batchQuantity;
  render();
}

function updateDetailDeviceSearch(input) {
  state.detailDeviceKeyword = input.value;
  render({
    focusSelector: "[data-detail-device-search]",
    focusSelectionStart: input.selectionStart ?? input.value.length,
  });
}

function updateManualDevice(input) {
  const id = Number(input.dataset.deviceId);
  const value = input.value.trim();
  state.manualDevices = state.manualDevices.map((device, index) => {
    if (device.id !== id) return device;
    if (!value) return { ...device, deviceId: "", version: "", region: "", status: "", error: "" };
    return {
      ...device,
      deviceId: value,
      version: index % 2 === 0 ? "23.110.105.46" : "23.110.105.43",
      region: "杭州低功耗",
      status: "可升级",
      error: "",
    };
  });
  delete state.errors.manualDevices;
  render();
}

function updateTaskDate(target, dateValue) {
  const fallbackStart = addMinutes(new Date(), 5);
  const currentStart = state.taskStartAt ? parseDateTime(state.taskStartAt) : fallbackStart;
  const currentEnd = state.taskEndAt ? parseDateTime(state.taskEndAt) : addDays(currentStart, 7);
  const picked = new Date(`${dateValue}T${target === "start" ? formatTime(currentStart) : formatTime(currentEnd)}`);
  state.quickRangeDays = null;
  if (target === "start") {
    const nextEnd = picked > currentEnd ? addDays(picked, 1) : currentEnd;
    state.taskStartAt = formatDateTime(picked);
    state.taskEndAt = formatDateTime(nextEnd);
  } else {
    const nextEnd = picked < currentStart ? addDays(currentStart, 1) : picked;
    state.taskEndAt = formatDateTime(nextEnd);
  }
  delete state.errors.taskTime;
  render();
}

function resetDateRange() {
  state.taskStartAt = "";
  state.taskEndAt = "";
  state.quickRangeDays = null;
  state.errors.taskTime = "请选择任务起止时间";
}

function updateTaskFilter(input) {
  const key = input.dataset.taskFilter;
  if (!key) return;
  state.taskFilters[key] = input.value;
  state.taskPage = 1;
  state.columnSettingsOpen = false;
  state.taskCreatorDropdownOpen = key === "creator";
  const isInput = input.matches("input");
  render(isInput
    ? { focusSelector: `[data-task-filter="${key}"]`, focusSelectionStart: input.selectionStart ?? input.value.length }
    : undefined);
}

function resetTaskFilters() {
  state.taskFilters = defaultTaskFilters();
  state.taskCreatorDropdownOpen = false;
  state.taskPage = 1;
  state.columnSettingsOpen = false;
}

function validateStep(step) {
  const errors = {};
  if (step === 1) {
    if (!state.strategy) errors.strategy = "请选择升级方式";
  }
  if (step === 2) {
    if (!state.form.taskName.trim()) errors.taskName = "请输入任务名称";
    if (isSyncCreateTask()) {
      if (!state.syncRegions.length) errors.syncRegions = "请至少选择一个同步目标大区";
    } else if (!isFixedCurrentRegionStrategy() && !state.selectedRegions.length) {
      errors.selectedRegions = "请选择当前大区执行范围";
    }
    if (!state.form.targetVersion) errors.targetVersion = "请选择目标固件版本";
    if (!state.taskStartAt || !state.taskEndAt) errors.taskTime = "请选择任务起止时间";
    if (!state.form.upgradeDesc.trim()) errors.upgradeDesc = "请输入任务升级说明";
    if (!state.packageType) errors.strategy = "请选择升级包类型";
    if (state.strategy === "version" && !state.selectedVersions.length) errors.strategy = "请至少选择一个源版本";
    if (state.strategy === "version" && state.quantityMode === "batch" && Number(state.batchQuantity) <= 0) errors.batchQuantity = "请输入大于 0 的统一下发数量";
    if (state.strategy === "file" && state.fileUploadStatus !== "uploaded") errors.fileUpload = "请先上传设备清单";
    if (state.strategy === "manual" && !state.manualDevices.some(device => device.deviceId && device.status === "可升级")) errors.manualDevices = "请至少添加一台可升级设备";
    if (state.conditionRegionEnabled && !availableConditionRegions().length) errors.conditionRegion = "当前执行范围下暂无可选地区";
    if (state.conditionRegionEnabled && availableConditionRegions().length && !state.conditionRegions.length) errors.conditionRegion = "请选择指定地区";
  }
  state.errors = errors;
  return Object.keys(errors);
}

function ensureStepValid(step) {
  const keys = validateStep(step);
  if (!keys.length) return true;
  const firstMessage = state.errors[keys[0]];
  showToast(firstMessage || "请完善必填信息");
  render();
  return false;
}

function setQuickRange(days, shouldRender = true) {
  const start = addMinutes(new Date(), 5);
  state.quickRangeDays = days;
  state.taskStartAt = formatDateTime(start);
  state.taskEndAt = formatDateTime(addDays(start, days));
  delete state.errors.taskTime;
  if (shouldRender) render();
}

function shiftCalendar(months) {
  const today = startOfDay(new Date());
  const fallbackStart = addMinutes(new Date(), 5);
  const start = state.taskStartAt ? parseDateTime(state.taskStartAt) : fallbackStart;
  const end = state.taskEndAt ? parseDateTime(state.taskEndAt) : addDays(start, 7);
  const shiftedStart = new Date(start);
  shiftedStart.setMonth(shiftedStart.getMonth() + months);
  const safeStart = startOfDay(shiftedStart) < today ? addMinutes(new Date(), 5) : shiftedStart;
  const durationDays = Math.max(1, Math.round((startOfDay(end) - startOfDay(start)) / (24 * 60 * 60 * 1000)));
  state.quickRangeDays = null;
  state.taskStartAt = formatDateTime(safeStart);
  state.taskEndAt = formatDateTime(addDays(safeStart, durationDays));
  render();
}

function changePage(scope, page) {
  if (scope !== "task") return;
  const pages = Math.max(Math.ceil(sortedTaskListRows().length / state.taskPageSize), 1);
  state.taskPage = Math.min(Math.max(page, 1), pages);
  render();
}

function changePageSize(scope) {
  if (scope !== "task") return;
  const sizes = [10, 20, 50];
  const currentIndex = sizes.indexOf(state.taskPageSize);
  state.taskPageSize = sizes[(currentIndex + 1) % sizes.length];
  state.taskPage = 1;
  showToast(`已切换为 ${state.taskPageSize} 条/页`);
  render();
}

function jumpPage(input) {
  const scope = input.dataset.scope;
  if (scope !== "task") return;
  const pages = Number(input.dataset.pages || 1);
  const value = Math.min(Math.max(Number(input.value || 1), 1), pages);
  state.taskPage = value;
  render();
}

function handleAction(action, el) {
  switch (action) {
    case "toggle-nav": {
      const key = el.dataset.key;
      state.navCollapsed[key] = !state.navCollapsed[key];
      render();
      break;
    }
    case "toggle-all-nav":
      state.navCollapsed.ota = !state.navCollapsed.ota;
      state.navCollapsed.logs = state.navCollapsed.ota;
      state.navCollapsed.users = state.navCollapsed.ota;
      render();
      break;
    case "toggle-requirement-notes":
      state.showRequirementNotes = !state.showRequirementNotes;
      render();
      break;
    case "open-region":
      openModal("region");
      break;
    case "toggle-region-dropdown":
      if (isSyncCreateTask() || isFixedCurrentRegionStrategy()) {
        showToast(isSyncCreateTask() ? "跨大区同步目标已在任务下发范围中选择" : "当前升级方式执行范围固定为顶部大区");
        break;
      }
      state.regionDropdownOpen = !state.regionDropdownOpen;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      render();
      break;
    case "toggle-condition-region-dropdown":
      if (!state.conditionRegionEnabled) {
        showToast("请先勾选指定地区");
        break;
      }
      if (isSyncCreateTask()) {
        showToast("跨大区同步不使用子节点地区条件");
        break;
      }
      if (!availableConditionRegions().length) {
        showToast("当前执行范围下暂无可选地区");
        break;
      }
      state.conditionRegionDropdownOpen = !state.conditionRegionDropdownOpen;
      state.regionDropdownOpen = false;
      state.regionOperatorOpen = false;
      render();
      break;
    case "toggle-region-operator":
      if (!state.conditionRegionEnabled) {
        showToast("请先勾选指定地区");
        break;
      }
      if (isSyncCreateTask()) {
        showToast("跨大区同步不使用子节点地区条件");
        break;
      }
      state.regionOperatorOpen = !state.regionOperatorOpen;
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      render();
      break;
    case "toggle-condition-region-enabled":
      if (isSyncCreateTask()) {
        showToast("跨大区同步不使用子节点地区条件");
        break;
      }
      state.conditionRegionEnabled = !state.conditionRegionEnabled;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      if (state.conditionRegionEnabled && !state.conditionRegions.length && availableConditionRegions().length) {
        state.conditionRegions = [availableConditionRegions()[0]];
      }
      if (!state.conditionRegionEnabled) {
        state.conditionRegions = [];
        delete state.errors.conditionRegion;
      }
      render();
      break;
    case "set-region-operator":
      state.regionOperator = el.dataset.operator || "等于";
      state.regionOperatorOpen = false;
      render();
      break;
    case "toggle-region": {
      const region = el.dataset.region;
      if (!region) break;
      if (state.selectedRegions.includes(region)) {
        state.selectedRegions = state.selectedRegions.filter(item => item !== region);
      } else {
        state.selectedRegions = isAllRegionScope(region)
          ? [region]
          : [...state.selectedRegions.filter(item => !isAllRegionScope(item)), region];
      }
      sanitizeRegionState({ preserveEmpty: true });
      delete state.errors.selectedRegions;
      delete state.errors.conditionRegion;
      render();
      break;
    }
    case "remove-region": {
      const region = el.dataset.region;
      state.selectedRegions = state.selectedRegions.filter(item => item !== region);
      sanitizeRegionState({ preserveEmpty: true });
      if (state.selectedRegions.length) delete state.errors.selectedRegions;
      render();
      break;
    }
    case "select-all-regions":
      state.selectedRegions = [...selectableExecutionRegions()];
      sanitizeRegionState();
      delete state.errors.selectedRegions;
      delete state.errors.conditionRegion;
      render();
      break;
    case "clear-regions":
      state.selectedRegions = [];
      state.conditionRegions = [];
      render();
      break;
    case "toggle-condition-region": {
      const region = el.dataset.region;
      if (!region || !availableConditionRegions().includes(region)) break;
      if (state.conditionRegions.includes(region)) {
        state.conditionRegions = state.conditionRegions.filter(item => item !== region);
      } else {
        state.conditionRegions = [...state.conditionRegions, region];
      }
      delete state.errors.conditionRegion;
      render();
      break;
    }
    case "remove-condition-region": {
      const region = el.dataset.region;
      state.conditionRegions = state.conditionRegions.filter(item => item !== region);
      if (state.conditionRegions.length) delete state.errors.conditionRegion;
      render();
      break;
    }
    case "select-all-condition-regions":
      state.conditionRegions = [...availableConditionRegions()];
      delete state.errors.conditionRegion;
      render();
      break;
    case "clear-condition-regions":
      state.conditionRegions = [];
      render();
      break;
    case "toggle-version": {
      const version = el.dataset.version;
      if (!version) break;
      if (state.selectedVersions.includes(version)) {
        state.selectedVersions = state.selectedVersions.filter(item => item !== version);
      } else {
        state.selectedVersions = [...state.selectedVersions, version];
      }
      delete state.errors.strategy;
      render();
      break;
    }
    case "toggle-all-versions": {
      const selectableVersions = firmwareVersions
        .filter(item => !(state.packageType === "diff" && !item.diffReady))
        .map(item => item.version);
      const allChecked = selectableVersions.every(version => state.selectedVersions.includes(version));
      state.selectedVersions = allChecked ? [] : selectableVersions;
      if (state.selectedVersions.length) delete state.errors.strategy;
      render();
      break;
    }
    case "toggle-sync-region": {
      const region = el.dataset.region;
      if (!region) break;
      if (state.syncRegions.includes(region)) {
        state.syncRegions = state.syncRegions.filter(item => item !== region);
      } else {
        state.syncRegions = [...state.syncRegions, region];
      }
      if (state.syncRegions.length) delete state.errors.syncRegions;
      render();
      break;
    }
    case "set-top-region": {
      const region = el.dataset.region;
      if (!region || state.topRegion === region) break;
      state.topRegion = region;
      state.selectedRegions = [topRegionAllScope()];
      state.conditionRegions = [];
      state.conditionRegionEnabled = false;
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      state.taskCreatorDropdownOpen = false;
      state.taskPage = 1;
      delete state.errors.selectedRegions;
      delete state.errors.conditionRegion;
      closeModal();
      showToast(`已切换顶部大区：${region}`);
      render();
      break;
    }
    case "confirm-region":
      closeModal();
      state.regionDropdownOpen = false;
      showToast(`当前顶部大区：${state.topRegion}`);
      break;
    case "toggle-creator-filter":
      state.taskCreatorDropdownOpen = !state.taskCreatorDropdownOpen;
      render({ focusSelector: `[data-task-filter="creator"]`, focusSelectionStart: state.taskFilters.creator.length });
      break;
    case "select-creator-filter":
      state.taskFilters.creator = el.dataset.creator || "";
      state.taskCreatorDropdownOpen = false;
      state.taskPage = 1;
      showToast(state.taskFilters.creator ? `已筛选创建人：${state.taskFilters.creator}` : "已切换为全部创建人");
      render();
      break;
    case "clear-creator-filter":
      state.taskFilters.creator = "";
      state.taskCreatorDropdownOpen = false;
      state.taskPage = 1;
      render({ focusSelector: `[data-task-filter="creator"]`, focusSelectionStart: 0 });
      break;
    case "open-status-filter":
      openModal("status");
      break;
    case "toggle-column-settings":
      state.columnSettingsOpen = !state.columnSettingsOpen;
      render();
      break;
    case "toggle-task-compact":
      state.taskCompact = !state.taskCompact;
      showToast(state.taskCompact ? "已切换为紧凑显示" : "已切换为标准显示");
      render();
      break;
    case "toggle-task-column": {
      const column = el.dataset.column;
      if (column && Object.prototype.hasOwnProperty.call(state.visibleTaskColumns, column)) {
        state.visibleTaskColumns[column] = !state.visibleTaskColumns[column];
        render();
      }
      break;
    }
    case "reset-task-columns":
      state.visibleTaskColumns = Object.fromEntries(taskColumnOptions.map(([key]) => [key, true]));
      render();
      break;
    case "save-task-columns":
      state.columnSettingsOpen = false;
      showToast("列设置已保存");
      render();
      break;
    case "refresh-task-list":
      showToast("列表已刷新");
      break;
    case "set-detail-status":
      state.detailStatus = el.dataset.status || "升级中";
      state.detailTab = "overview";
      state.detailSourceExpanded = false;
      render();
      break;
    case "set-detail-metric-mode":
      state.detailMetricMode = el.dataset.mode || "versionFull";
      if (state.detailMetricMode === "manual" && ["待审批", "已驳回", "已失效"].includes(state.detailStatus)) {
        state.detailStatus = "待执行";
      }
      state.flowTab = "progress";
      state.detailTab = "overview";
      state.detailSourceExpanded = false;
      render();
      break;
    case "toggle-detail-source":
      state.detailSourceExpanded = !state.detailSourceExpanded;
      render();
      break;
    case "set-detail-tab":
      state.detailTab = el.dataset.tab || "overview";
      render();
      break;
    case "set-flow-tab":
      state.flowTab = el.dataset.tab || "progress";
      render();
      break;
    case "change-page":
      changePage(el.dataset.scope, Number(el.dataset.page || 1));
      break;
    case "change-page-size":
      changePageSize(el.dataset.scope);
      break;
    case "open-preview":
      state.createStep = 3;
      render({ preserveScroll: false });
      break;
    case "close-modal":
      closeModal();
      break;
    case "save-task":
      if (!state.strategy) {
        state.errors.strategy = "请选择升级方式后再保存草稿";
        showToast("请选择升级方式后再保存草稿");
        render();
        break;
      }
      state.draftTask = snapshotDraftTask();
      state.editingDraft = false;
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      state.datePickerOpen = false;
      showToast("任务草稿已保存，可在任务列表编辑");
      setRoute("task-list");
      break;
    case "edit-draft":
      restoreDraftTask();
      showToast("已进入草稿编辑");
      break;
    case "copy-rebuild-task":
      state.editingDraft = true;
      resetCreateTaskState();
      state.createStep = 2;
      showToast("已复制原任务配置，可重新创建发布");
      setRoute("create-task");
      break;
    case "delete-draft":
      state.draftTask = null;
      showToast("草稿已删除");
      render();
      break;
    case "set-quick-range":
      setQuickRange(Number(el.dataset.days || 7));
      break;
    case "toggle-date-picker":
      state.datePickerOpen = !state.datePickerOpen;
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      render();
      break;
    case "select-date":
      updateTaskDate(el.dataset.target || "start", el.dataset.date);
      break;
    case "clear-date-range":
      resetDateRange();
      state.datePickerOpen = true;
      render();
      break;
    case "confirm-date-range":
      state.datePickerOpen = false;
      render();
      break;
    case "shift-calendar":
      shiftCalendar(Number(el.dataset.shift || 0));
      break;
    case "publish-task":
      if (!ensureStepValid(1) || !ensureStepValid(2)) break;
      closeModal();
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      state.datePickerOpen = false;
      openModal("publishResult");
      render();
      break;
    case "publish-result-list":
      closeModal();
      setRoute("task-list");
      break;
    case "publish-result-detail":
      closeModal();
      setRoute("task-detail");
      break;
    case "next-create-step":
      if (!ensureStepValid(state.createStep)) break;
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      state.createStep = Math.min(state.createStep + 1, 3);
      render({ preserveScroll: false });
      break;
    case "prev-create-step":
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      state.createStep = Math.max(state.createStep - 1, 1);
      render({ preserveScroll: false });
      break;
    case "cancel-create":
      state.createStep = 1;
      setRoute("task-list");
      break;
    case "mock-upload":
      simulateFileUpload();
      delete state.errors.fileUpload;
      break;
    case "download-template":
      showToast("设备导入模板已生成");
      break;
    case "add-manual-device":
      if (state.manualDevices.length >= 10) {
        showToast("手动导入最多支持 10 台设备");
        break;
      }
      state.manualDevices = [
        ...state.manualDevices,
        { id: state.manualNextId, deviceId: "", version: "", region: "", status: "", error: "" },
      ];
      state.manualNextId += 1;
      showToast("已添加设备输入行");
      render();
      break;
    case "remove-device": {
      const id = Number(el.dataset.deviceId);
      if (state.manualDevices.length <= 1) {
        showToast("至少保留一行设备输入");
        break;
      }
      state.manualDevices = state.manualDevices.filter(device => device.id !== id);
      showToast("设备已从手动导入列表删减");
      render();
      break;
    }
    case "download-exception":
      showToast("异常明细已生成");
      break;
    case "export-device-list":
      showToast(state.detailDeviceKeyword.trim() ? "已导出当前筛选后的设备列表" : "设备列表已导出");
      break;
    case "open-role-create":
      openModal("roleCreate");
      break;
    case "create-role":
      closeModal();
      showToast("角色已新增");
      break;
    case "end-task":
      openModal("confirmEnd");
      break;
    case "confirm-end":
      closeModal();
      showToast("任务已结束");
      break;
    case "query":
      state.taskCreatorDropdownOpen = false;
      showToast(`筛选条件已应用，共 ${sortedTaskListRows().length} 条`);
      render();
      break;
    case "reset":
      resetTaskFilters();
      showToast("筛选条件已重置");
      render();
      break;
    case "choose-status":
      closeModal();
      showToast("任务状态筛选已更新");
      break;
    case "save-user-permission":
      showToast("用户权限已保存");
      setRoute("user-list");
      break;
    case "save-role-permission":
      showToast("角色权限已保存");
      setRoute("role-list");
      break;
    case "delete-role":
      showToast("默认角色不允许删除");
      break;
    case "show-strategy":
      openModal("strategyDetail");
      break;
    default:
      break;
  }
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && state.modal) closeModal();
});

render();
