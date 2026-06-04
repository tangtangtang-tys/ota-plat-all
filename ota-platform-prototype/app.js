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
  packageType: "whole",
  strategy: "version",
  previewScenario: "mixed",
  quantityMode: "full",
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

const taskRows = [
  ["单台升级", "手动导入", "1", "2026-05-19 11:05:00~2026-05-19 12:00:00", "0%", "1", "中国/杭州低功耗", "待执行", "2026-05-19 09:11:24", true],
  ["kg111", "手动导入", "1", "2026-05-19 09:13:00~2026-05-19 10:00:00", "0%", "1", "中国/杭州低功耗", "升级中", "2026-05-19 09:03:18", true],
  ["4.17-5.7测试记录(中视讯-沃视佳)", "文件导入", "664", "2026-05-13 18:59:01~2026-08-13 18:59:01", "52%", "0", "中国/杭州低功耗", "已完成", "2026-05-13 18:02:14", true],
  ["Allid综合导入", "文件导入", "6505", "2026-05-13 11:25:20~2026-08-13 11:25:20", "6%", "0", "中国/杭州低功耗", "升级中", "2026-05-13 11:22:42", true],
  ["Allid综合导入", "文件导入", "1196", "2026-05-13 11:22:52~2026-08-13 11:22:52", "9%", "0", "中国/杭州低功耗", "升级中", "2026-05-13 11:21:18", true],
  ["kg1111", "手动导入", "1", "2026-05-12 11:24:00~2026-05-12 12:00:00", "100%", "0", "中国/杭州低功耗", "已完成", "2026-05-12 11:22:33", false],
  ["KG124", "手动导入", "1", "2026-05-11 19:11:00~2026-05-11 20:00:00", "100%", "0", "中国/杭州低功耗", "已完成", "2026-05-11 19:07:32", false],
  ["测试数据（华拓20260507）异常明细", "文件导入", "327", "2026-05-09 16:51:20~2026-08-09 16:51:20", "0%", "0", "中国/杭州低功耗", "升级中", "2026-05-09 16:49:28", true],
  ["VSTC_0420_欧亚非(威视达康0509)", "文件导入", "852", "2026-05-09 16:41:08~2026-08-09 16:41:08", "5%", "0", "中国/杭州低功耗", "升级中", "2026-05-09 16:39:16", true],
  ["VSTC_0420_欧亚非(威视达康测试)", "文件导入", "1851", "2026-05-09 16:40:34~2026-08-09 16:40:34", "22%", "0", "中国/杭州低功耗", "升级中", "2026-05-09 16:37:40", true],
  ["测试数据（华拓20260507）", "文件导入", "2310", "2026-05-09 16:23:44~2026-08-09 16:23:44", "0%", "0", "中国/杭州低功耗", "升级中", "2026-05-09 16:22:11", true],
];

const taskStatusMeta = {
  "待执行": { color: "gray", actions: ["detail", "end"] },
  "升级中": { color: "blue", actions: ["detail", "end"] },
  "已完成": { color: "green", actions: ["detail"] },
  "已结束": { color: "gray", actions: ["detail"] },
  "待发布": { color: "orange", actions: ["editDraft", "deleteDraft"] },
  "待审批": { color: "orange", actions: ["detail"] },
  "已驳回": { color: "red", actions: ["detail", "copyRebuild"] },
  "已失效": { color: "red", actions: ["detail", "copyRebuild"] },
};

const taskListRows = [
  { id: "OTA202606030001", name: "IPC-杭州低功耗_安全补丁升级", method: "指定版本", quantityMode: "full", packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-06-10 09:00:00~2026-06-17 09:00:00", result: null, region: "中国/杭州低功耗", status: "待审批", creator: "汤彦珊", createdAt: "2026-06-03 17:20:18" },
  { id: "OTA202606030002", name: "杭州低功耗灰度定时升级", method: "指定版本", quantityMode: "batch", planned: 5000, packageType: "差分包", targetVersion: "23.422.209.17", total: null, time: "2026-06-04 10:00:00~2026-06-11 10:00:00", result: null, region: "中国/杭州低功耗", status: "待执行", creator: "江锐", createdAt: "2026-06-03 16:42:05" },
  { id: "OTA202606010001", name: "文件导入_欧亚非补丁升级", method: "文件导入", packageType: "整包", targetVersion: "23.422.209.17", total: "664", time: "2026-06-01 18:59:01~2026-06-30 18:59:01", result: { success: 346, failed: 0, total: 664 }, region: "欧亚非", status: "升级中", creator: "钱江涛", createdAt: "2026-06-01 18:02:14" },
  { id: "OTA202605130001", name: "低功耗设备夜间唤醒修复", method: "指定版本", quantityMode: "full", packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-05-13 11:25:20~2026-06-02 11:25:20", result: { matched: 6505, success: 6488, failed: 17 }, region: "中国/杭州低功耗", status: "已完成", creator: "江锐", createdAt: "2026-05-13 11:22:42" },
  { id: "OTA202605190001", name: "黑光升级双光测试", method: "文件导入", packageType: "差分包", targetVersion: "23.110.105.46", total: "1196", time: "2026-05-19 16:33:42~2026-06-19 16:33:42", result: { success: 730, failed: 8, total: 1196 }, region: "中国/杭州", status: "已结束", creator: "钱江涛", createdAt: "2026-05-19 16:31:18" },
  { id: "OTA202605090002", name: "华拓测试数据异常明细", method: "文件导入", packageType: "整包", targetVersion: "23.422.209.17", total: "327", time: "2026-05-09 16:51:20~2026-08-09 16:51:20", result: null, region: "中国/杭州低功耗", status: "已驳回", creator: "江锐", createdAt: "2026-05-09 16:49:28" },
  { id: "OTA202605090001", name: "审批超时_安全补丁升级", method: "指定版本", quantityMode: "full", packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-05-09 16:40:34~2026-06-09 16:40:34", result: null, region: "欧亚非", status: "已失效", creator: "汤彦珊", createdAt: "2026-05-09 16:37:40" },
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

const regionOptions = [
  "中国 / 杭州低功耗",
  "中国 / 杭州",
  "中国 / 深圳",
  "中国 / 成都",
  "中国 / 上海",
  "中非 / 丹麦 / Kyiv",
  "中非 / 乌克兰 / Odesa",
];

const regionTree = [
  { label: "中国", children: [
    { label: "杭州低功耗" },
    { label: "杭州" },
    { label: "深圳" },
    { label: "成都" },
    { label: "上海" },
  ] },
  { label: "中非", children: [
    { label: "丹麦", children: [{ label: "Kyiv" }, { label: "Kyiv City" }, { label: "Odesa" }, { label: "Rivne" }] },
    { label: "乌克兰", children: [{ label: "Chernihivtsi" }, { label: "Dnipropetrovsk" }, { label: "Kyiv" }, { label: "Kyiv City" }, { label: "Odesa" }] },
    { label: "乌兹别克斯坦", children: [{ label: "Barishivka" }, { label: "Bohuslav" }, { label: "Bucha" }, { label: "Danylivka" }, { label: "Dymer" }] },
  ] },
  { label: "丹麦", children: [
    { label: "Kyiv" },
    { label: "Kyiv City" },
    { label: "Odesa" },
  ] },
  { label: "乌克兰", children: [
    { label: "Kyiv" },
    { label: "Kyiv City" },
    { label: "Odesa" },
  ] },
  { label: "班基", children: [
    { label: "Bucha" },
    { label: "Danylivka" },
  ] },
];

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

const requirementsMarkdown = "# OTA 升级任务管理优化产品需求文档\n\n## 1. 摘要\n\n### 问题背景\n\n当前 OTA 升级任务创建、任务列表和任务详情中，存在流程步骤割裂、状态操作不统一、设备统计口径混用、详情页信息分散的问题。尤其在“指定版本升级”场景下，设备总数在执行过程中动态匹配，创建任务时无法准确得到最终设备规模，若按固定设备总数展示进度，会误导用户判断任务规模、成功率和失败率。\n\n### 解决方案\n\n围绕“新增任务、任务列表、任务详情、升级明细”进行信息架构和交互优化：新增任务压缩为三步流程，发布结果通过弹窗反馈；任务列表统一字段、筛选、列设置和状态操作；任务详情以“任务概览 / 升级明细”组织信息；升级统计明确区分“指定版本动态匹配”和“文件/手动导入固定清单”两类口径；异常分类采用 ECharts 基础环形图和分类列表联动展示。\n\n### 成功标准\n\n- 新增任务流程按三步完成，最后发布结果不再作为独立步骤跳转。\n- 每一步必填项校验完整，未填写时阻止进入下一步并展示字段级提示。\n- 指定版本全量场景不展示未知总数百分比，只展示已匹配数、成功数、失败数及基于已匹配数的占比。\n- 文件/手动导入场景展示明确设备总数、已处理、成功、失败、未处理。\n- 任务列表字段、状态、操作、分页、列设置符合统一规则。\n- 详情页信息不重复：任务配置在“任务概览”，执行结果、异常分类、设备列表在“升级明细”。\n- 异常分类按 6 个一级分类展示，环形图与右侧列表支持鼠标移入联动。\n\n### 本次需求范围\n\n本次需求范围聚焦 OTA 升级任务管理链路的前端交互、信息架构、展示口径和原型验证，不覆盖真实后端执行能力建设。\n\n范围内：\n\n- **新增任务**：覆盖基础信息、配置升级策略、预览发布三步流程，以及保存草稿、提交审批、发布反馈、必填校验、时间选择、指定版本表格勾选、文件导入、手动导入等交互。\n- **任务列表**：覆盖查询筛选、状态统计卡片、列表字段、列设置、分页、创建时间倒序、状态展示、执行结果展示和不同状态下的操作按钮。\n- **任务详情**：覆盖顶部任务概览卡、任务进度、流转明细、任务概览页签、升级明细页签，以及不同任务状态下的字段展示规则。\n- **升级统计口径**：覆盖文件导入、手动导入、指定版本全量、指定版本批量四类口径，明确固定设备总数和动态匹配设备数的展示差异。\n- **异常分类**：覆盖 6 个一级异常分类、ECharts 基础环形图、分类列表联动、异常明细下载入口和最小可行版本展示方案。\n- **原型验证**：覆盖任务状态模拟、统计口径模拟、预览发布三种场景模拟，用于产品、研发、测试共同核对逻辑闭环。\n\n范围外：\n\n- 不包含真实 OTA 任务下发、设备动态匹配、设备升级执行和结果回传能力。\n- 不包含真实审批流、真实文件解析、真实设备校验和真实异常明细生成。\n- 不包含跨大区聚合查询、复杂报表、异常趋势分析、异常原因多级钻取和权限体系重构。\n\n## 2. 用户体验与功能\n\n### 用户角色\n\n- **运营/实施用户**：创建 OTA 升级任务，跟踪任务状态和升级结果。\n- **产线负责人**：审批任务，关注升级范围、目标版本、策略条件和风险。\n- **产品负责人**：确认创建、审批、执行、结束、复制重建等流程是否闭环。\n- **研发人员**：按清晰口径实现状态、统计字段、异常分类和权限操作。\n- **测试人员**：验证不同状态、升级方式、统计口径下的页面展示是否正确。\n\n### 用户故事\n\n- 作为运营用户，我希望按步骤创建 OTA 升级任务，以避免遗漏必填配置。\n- 作为产线负责人，我希望清晰查看任务配置和策略条件，以便安全审批任务。\n- 作为普通用户，我希望任务流转进度和设备升级结果分开展示，以避免混淆流程状态和执行结果。\n- 作为研发人员，我希望统计口径规则明确，以便一致实现动态匹配和固定清单场景。\n- 作为测试人员，我希望原型提供状态和统计口径模拟控件，以便高效验证不同展示场景。\n\n### 验收标准\n\n- 新增任务流程为：`基础信息 > 配置升级策略 > 预览发布`。\n- 发布成功、提交审批成功、保存草稿成功均通过弹窗或消息反馈，不新增“完成”步骤。\n- 保存草稿后默认返回任务列表，草稿状态为“待发布”，支持二次进入编辑。\n- 指定版本升级不再提供“全部版本升级 / 仅指定版本升级 / 排除指定版本不升级”切换，统一使用源版本表格勾选。\n- 配置升级数量为“全量”时，表格“升级设备数”展示 `全量`；为“批量”时，仅支持统一输入数量，不支持单个源版本分别输入。\n- 任务列表支持筛选、分页、列设置、刷新，默认按创建时间倒序。\n- 详情页主页签为：`任务概览 / 升级明细`。\n- 任务概览只展示任务配置、策略条件和任务流转，不展示设备执行结果。\n- 升级明细展示升级概览、异常分类、设备列表和导出操作。\n- 非执行态任务进入“升级明细”时展示空状态，不展示设备表格。\n- 原型阶段提供状态模拟和统计口径模拟按钮，方便验证展示逻辑；生产环境不展示模拟按钮。\n\n### 非目标\n\n- 不实现真实后端设备检索、动态匹配和下发逻辑。\n- 不实现真实审批流接口。\n- 不实现真实文件解析和设备校验。\n- 不支持跨多个大区查询，仍通过顶部大区切换查看不同大区任务。\n- 不新增人工智能能力。\n- 最小可行版本不做异常原因多级钻取、趋势分析或复杂报表。\n\n## 3. 人工智能能力要求\n\n不适用。本需求不涉及人工智能模型、人工智能工具调用、生成式输出或人工智能评估策略。\n\n## 4. 技术规格\n\n### 架构概览\n\n当前原型以静态网页技术实现，核心模块包括：\n\n- 新增任务向导\n- 任务列表与分页\n- 任务列表列设置\n- 任务详情\n- 状态模拟\n- 统计口径模拟\n- 任务进度与流转明细\n- 升级概览、异常分类与设备列表\n\n前端状态建议维护：\n\n| 状态字段 | 说明 |\n| --- | --- |\n| `createStep` | 当前新增任务步骤，取值 1-3 |\n| `quantityMode` | 全量 / 批量 |\n| `selectedVersions` | 指定版本升级中勾选的源版本 |\n| `selectedRegions` | 任务执行大区或策略地区 |\n| `previewScenario` | 原型预览发布模拟场景 |\n| `taskFilters` | 任务列表查询条件 |\n| `taskPage` | 任务列表当前分页 |\n| `visibleTaskColumns` | 任务列表列设置 |\n| `detailStatus` | 当前详情模拟状态 |\n| `detailMetricMode` | 文件导入 / 手动导入 / 指定版本全量 / 指定版本批量 |\n| `detailTab` | 任务概览 / 升级明细 |\n| `flowTab` | 任务进度 / 流转明细 |\n\n### 接口集成点\n\n后端接口建议包含：\n\n- 创建任务接口\n- 保存草稿接口\n- 提交审批接口\n- 查询任务列表接口\n- 查询任务详情接口\n- 查询升级明细接口\n- 查询设备列表接口\n- 查询流转明细接口\n- 下载异常明细接口\n- 导出设备列表接口\n- 结束任务接口\n- 复制重建接口\n\n建议数据字段：\n\n| 字段 | 说明 |\n| --- | --- |\n| `taskId` | 任务标识 |\n| `taskName` | 任务名称 |\n| `targetVersion` | 目标版本 |\n| `upgradeMethod` | 指定版本 / 文件导入 / 手动导入 |\n| `packageType` | 整包 / 差分包 |\n| `region` | 任务所属大区 |\n| `quantityMode` | 全量 / 批量 |\n| `plannedSuccessCount` | 批量场景计划成功下发数量 |\n| `matchedCount` | 指定版本场景已匹配数 |\n| `totalDeviceCount` | 文件/手动导入场景设备总数 |\n| `processedCount` | 已处理设备数 |\n| `upgradeSuccessCount` | 升级成功数 |\n| `upgradeFailedCount` | 升级失败数 |\n| `pendingCount` | 未处理或待匹配数量 |\n| `sourceVersions` | 指定版本升级的源版本列表 |\n| `sourceScope` | 文件/手动导入的设备来源 |\n| `strategyConditions` | 策略条件，如指定地区 |\n| `taskStatus` | 任务状态 |\n| `createdBy` | 创建人 |\n| `createdAt` | 创建时间 |\n| `updatedAt` | 更新时间，详情页可展示 |\n| `submittedAt` | 提交审批时间 |\n| `approvedAt` | 审批通过时间 |\n| `rejectedAt` | 审批驳回时间 |\n| `startAt` | 任务开始时间 |\n| `endAt` | 任务结束时间 |\n\n### 安全与隐私\n\n- 设备标识、区域信息、固件版本号属于业务敏感数据，需按权限展示。\n- 文件导入/手动导入设备清单需校验权限后展示和导出。\n- 审批、结束任务、删除草稿、复制重建等操作需后端权限校验。\n- 操作审计记录需由后端保留；详情页不单独展示“操作记录”，只展示任务流转明细。\n\n## 5. 功能需求\n\n### 5.1 新增任务流程\n\n新增任务流程固定为三步：\n\n```text\n基础信息 → 配置升级策略 → 预览发布\n```\n\n发布结果不作为第 4 步展示：\n\n- 保存草稿：提示保存成功，返回任务列表，状态为“待发布”。\n- 发布需审批：提示提交审批成功，进入“待审批”状态。\n- 发布无需审批：提示发布成功，按任务起止时间进入“待执行”或后续执行状态。\n\n发布结果弹窗规则：\n\n- 弹窗需展示结果标题、结果说明、任务摘要和后续流程说明，避免用户提交后不知道下一步去向。\n- 发布需审批时，需说明任务已进入“待审批”，审批通过前不会进入执行队列，也不会下发 OTA；审批通过后按任务时间进入待执行或升级中；审批驳回或超时失效时任务不会下发。\n- 发布无需审批时，需说明任务已发布，未到开始时间为“待执行”，到达开始时间后进入“升级中”，升级结果可在任务详情的升级明细中查看。\n- 弹窗底部提供“返回任务列表”和“查看任务详情”两个明确出口。\n- 点击关闭按钮或遮罩关闭时，默认返回任务列表，保证创建流程闭环。\n\n基础信息必填字段：\n\n- 任务名称\n- 任务执行大区\n- 目标固件版本号\n- 任务起止时间\n- 任务升级说明\n\n基础信息字段规则：\n\n| 字段 | 是否必填 | 格式要求 | 异常提示 | 交互要求 |\n| --- | --- | --- | --- | --- |\n| 任务名称 | 必填 | 1-64 个字符；不允许只输入空格；建议包含升级对象、地区或升级目的，便于列表识别 | 未填写时提示：`请输入任务名称`；超过 64 个字符时禁止继续输入或提示：`任务名称最多 64 个字符` | 输入框右侧展示字数计数；用户输入后清除字段错误；保存草稿和进入下一步时均需校验 |\n| 任务执行大区 | 必填 | 至少选择 1 个任务执行大区；支持选择大区及其子集群；可多选 | 未选择时提示：`请选择任务执行大区` | 采用下拉级联多选；输入框内以标签展示已选项；支持删除单个标签、全选、清空；选项过多时输入框高度自适应 |\n| 目标固件版本号 | 必填 | 只能从已上架或已生成升级包的目标版本中选择；不支持手动输入不存在的版本 | 未选择时提示：`请选择目标固件版本`；版本不可用时提示：`当前版本暂不可用于创建升级任务` | 使用下拉选择；切换升级包类型时，目标版本展示对应可用状态；已是目标版本的设备不进入升级范围 |\n| 任务起止时间 | 必填 | 开始时间不得早于当前时间；默认开始时间为当前时间后 5 分钟；结束时间必须晚于开始时间 | 未选择时提示：`请选择任务起止时间`；选择过去时间时提示：`开始时间不可早于当前时间`；结束时间早于开始时间时提示：`结束时间必须晚于开始时间` | 使用日期时间范围选择器；过去日期不可选；支持快捷按钮：未来 7 天、未来 30 天、未来 90 天；点击快捷按钮后自动设置开始与结束时间 |\n| 任务升级说明 | 必填 | 1-500 个有效字符；需说明升级目标、影响范围、灰度或回滚关注点；不允许只输入空格 | 未填写时提示：`请输入任务升级说明`；超过 500 个字符时禁止继续输入或提示：`任务升级说明最多 500 个字符` | 使用多行文本框；支持换行；右下角展示字数统计；用户输入后清除字段错误；保存草稿和进入下一步时均需校验 |\n\n时间选择规则：\n\n- 过去日期不可选。\n- 默认开始时间为当前时间后 5 分钟。\n- 快捷时间按钮为：`未来 7 天`、`未来 30 天`、`未来 90 天`。\n- 点击快捷时间后，默认配置为“当前时间后 5 分钟”至对应未来周期结束。\n\n校验规则：\n\n- 每一步点击下一步或发布前，都必须校验当前步骤必填项。\n- 未填写字段需展示字段级错误提示，并阻止进入下一步。\n- 上传文件、手动导入设备、源版本勾选等策略配置也需在进入预览发布前校验。\n\n### 5.2 配置升级策略\n\n升级包类型：\n\n- 整包\n- 差分包\n\n升级方式：\n\n- 指定版本升级\n- 文件导入升级\n- 手动导入升级\n\n所有支持多选的输入框，交互应采用类似企业后台组件库的下拉多选样式：\n\n- 输入框内展示已选标签。\n- 下拉面板支持勾选。\n- 支持清空或删除单个标签。\n- 控件高度需自适应，不得出现内容溢出。\n\n### 5.3 指定版本升级\n\n交互要求：\n\n- 使用源版本表格勾选作为统一入口。\n- 不再拆分“全部版本升级 / 仅指定版本升级 / 排除指定版本不升级”。\n- 表格支持全选、单选、取消勾选。\n- 表格字段为：`源版本号`、`升级设备数`。\n\n配置升级数量：\n\n- 全量：右侧说明文案为 `按表格勾选范围下发全部可升级版本`；表格“升级设备数”展示 `全量`。\n- 批量：右侧说明文案为 `所有勾选源版本统一按该数量下发`；用户只输入统一数量。\n\n统计口径：\n\n- 全量场景最终设备数不可预估，执行过程中逐步匹配。\n- 批量场景有计划成功下发数量，但下发失败不占用匹配名额，系统需持续补充匹配符合条件设备。\n\n### 5.4 文件导入升级\n\n功能要求：\n\n- 支持表格文件。\n- 提供下载模板按钮。\n- 上传前不展示设备清单预检结果，不默认展示已上传状态。\n- 用户点击上传后，需体现未上传、上传中、上传完成的状态变化。\n- 上传完成后展示文件名、识别设备数量、上传完成状态，支持重新上传。\n- 不向用户展示研发校验规则。\n- 上传区与结果区布局需清晰，不得将上传、说明、表格压缩到同一狭窄区域。\n\n### 5.5 手动导入升级\n\n功能要求：\n\n- 最多 10 台。\n- 支持逐行录入或批量粘贴设备标识。\n- 录入后展示设备列表。\n- 列表字段包括：设备标识、源固件版本号、所属大区、校验状态、异常说明、操作。\n- 支持删除单台设备。\n- 校验状态由系统根据设备标识检索后展示。\n\n### 5.6 预览发布\n\n预览发布需支持三种结果场景：\n\n| 场景 | 展示与操作 |\n| --- | --- |\n| 存在部分可升级 | 提示“检测到部分设备不符合发布条件”，展示基本信息、升级策略、任务预览、异常分类明细，支持下载异常文件明细，可继续发布或提交审批 |\n| 不存在可升级 | 提示“无法发布 OTA 升级任务”，不支持发布 |\n| 全部可升级 | 提示“预检通过”，支持正常发布；指定版本和文件导入方式需走审批流程 |\n\n原型阶段需提供三个模拟按钮，便于切换查看上述场景。\n\n## 6. 任务列表需求\n\n### 6.1 查询区\n\n查询条件顺序：\n\n1. 任务名称\n2. 任务状态\n3. 升级方式\n4. 升级包\n5. 创建人\n6. 创建时间\n\n字段规则：\n\n| 条件 | 默认值 | 交互方式 | 查询规则 |\n| --- | --- | --- | --- |\n| 任务名称 | 空 | 输入框 | 支持任务名称模糊搜索 |\n| 任务状态 | 全部 | 下拉单选 | 支持全部、待发布、待审批、待执行、升级中、已完成、已结束、已驳回、已失效 |\n| 升级方式 | 全部 | 下拉单选 | 支持全部、指定版本、文件导入、手动导入 |\n| 升级包 | 全部 | 下拉单选 | 支持全部、整包、差分包 |\n| 创建人 | 空 | 输入 + 下拉选择 | 支持模糊搜索创建人并选择 |\n| 创建时间 | 空 | 日期选择器 | 选择某日创建的任务，不使用时间区间 |\n\n交互要求：\n\n- 查询条件变更后，列表需真实过滤并重置到第一页。\n- 创建人输入时展示匹配候选项，点击候选项后填入输入框并触发筛选。\n- 不支持跨多个大区查询，任务数据随顶部大区切换。\n\n### 6.2 状态统计卡片\n\n查询区上方展示基础状态统计卡片：\n\n- 当前任务大区\n- 全部任务\n- 待发布\n- 待审批\n- 待执行\n- 升级中\n- 已完成\n- 已结束\n- 已驳回\n- 已失效\n\n统计卡片只表达当前顶部大区下的任务状态数量，不包含跨大区汇总。\n\n### 6.3 列表字段与布局\n\n任务列表字段：\n\n- 名称\n- 升级方式\n- 升级包\n- 目标版本\n- 升级设备数\n- 任务时间\n- 执行结果\n- 任务所属大区\n- 状态\n- 创建人\n- 创建时间\n- 操作\n\n排序规则：\n\n- 默认按创建时间倒序。\n- 列表不展示更新时间。\n\n字段展示规则：\n\n- “升级设备数”统一展示为 `N 台` 或 `全量`，保持一致性。\n- 指定版本全量展示 `全量`。\n- 指定版本批量展示设置的计划数量。\n- 文件导入/手动导入展示固定设备数量。\n- 执行结果需一眼看出成功与失败数量及占比，不按动态文案展示。\n- 非执行态任务执行结果展示 `-`。\n\n列设置：\n\n- 支持用户勾选展示字段。\n- 勾选后即时预览列表列变化。\n- 支持列设置刷新。\n- 操作列固定在右侧。\n- 文案过长时通过横向滚动查看，不设置桌面端精简模式。\n\n分页：\n\n- 分页器需可交互。\n- 支持页码切换。\n- 支持每页条数切换。\n- 查询条件变化后重置到第一页。\n\n### 6.4 状态操作\n\n任务状态定义：\n\n| 状态 | 说明 |\n| --- | --- |\n| 待发布 | 用户创建任务但未提交发布，保存草稿状态 |\n| 待审批 | 任务已提交发布但尚未审批通过 |\n| 待执行 | 审批通过且未到任务下发执行时间 |\n| 升级中 | 任务审批通过并到达任务下发时间周期，开始执行 OTA 升级 |\n| 已完成 | 任务周期内所有符合下发的设备均完成升级任务，包含升级失败设备 |\n| 已结束 | 任务执行中被用户提前手动结束 |\n| 已驳回 | 审批被驳回 |\n| 已失效 | 审批未及时处理，超过审批有效时间 |\n\n状态操作规则：\n\n| 状态 | 操作 |\n| --- | --- |\n| 待发布 | 编辑、删除 |\n| 待审批 | 详情 |\n| 待执行 | 详情 |\n| 升级中 | 详情、结束任务 |\n| 已完成 | 详情 |\n| 已结束 | 详情 |\n| 已驳回 | 详情、复制重建 |\n| 已失效 | 详情、复制重建 |\n\n## 7. 任务详情需求\n\n### 7.1 页面结构\n\n详情页主页签：\n\n```text\n任务概览 / 升级明细\n```\n\n任务概览：\n\n- 顶部任务概览卡\n- 策略条件\n- 任务进度\n- 流转明细\n\n升级明细：\n\n- 升级概览\n- 异常分类\n- 设备列表\n\n顶部操作按钮规则：\n\n- 只放真实任务操作，如结束任务、复制重建。\n- 不在顶部卡片额外放“查看升级明细”按钮，避免与页签导航重复。\n\n### 7.2 顶部任务概览卡\n\n顶部任务概览卡关注升级任务本身，不展示任务流程进度仪表盘，也不展示重复执行概览。\n\n展示规则：\n\n- 任务状态标签放在任务名称旁边。\n- 元信息行展示：任务标识、创建人、更新时间。\n- 任务说明放在元信息行下方。\n- 匹配规则字段与新增任务中的“策略条件”保持一致，不额外加背景框。\n\n核心字段：\n\n- 任务名称\n- 当前状态\n- 任务标识\n- 创建人\n- 更新时间\n- 任务说明\n- 目标版本\n- 任务时间\n- 任务大区\n- 升级设备数\n- 升级方式\n- 升级包\n- 下发方式\n- 审批流程\n- 指定地区\n- 指定源版本或设备来源\n\n### 7.3 任务进度与流转明细\n\n任务进度只表达流程阶段，不展示设备执行百分比、执行结果占比或升级仪表盘。\n\n局部页签：\n\n- 任务进度\n- 流转明细\n\n阶段包括：\n\n- 创建任务\n- 提交审批\n- 审批结果\n- 等待执行\n- OTA 下发\n- 任务结束\n\n图标语义：\n\n| 阶段 | 图标语义 |\n| --- | --- |\n| 创建任务 | 文档 |\n| 提交审批 | 用户 |\n| 审批结果 | 盾牌 |\n| 等待执行 | 时钟 |\n| OTA 下发 | 刷新 |\n| 任务结束 | 完成 |\n\n状态文案规则：\n\n- 待审批：停留在审批结果节点，提示审批处理中，任务尚未进入执行队列。\n- 已驳回：停留在审批结果节点，展示驳回原因，后续执行节点置灰。\n- 已失效：停留在审批结果节点，展示失效原因，后续执行节点置灰。\n- 待执行：停留在等待执行节点，提示等待到达计划开始时间。\n- 升级中：停留在 OTA 下发节点，提示执行结果持续回传中。\n- 已完成：所有流程节点完成。\n- 已结束：展示中性终止态，说明任务提前结束和结束原因。\n\n流转明细：\n\n- 以时间线展示创建、提交审批/发布、审批结果、开始下发、执行中、完成或结束。\n- 待执行不得记录为“已开始下发”。\n- 已驳回、已失效不展示 OTA 下发和任务完成记录。\n- 不再单独展示“操作记录”模块。\n\n### 7.4 升级概览\n\n升级概览只在“升级明细”页签中展示。\n\n非执行态：\n\n- 待发布、待审批、待执行、已驳回、已失效不展示升级概览数据卡，展示空状态或提示任务尚未进入执行阶段。\n\n执行态：\n\n- 升级中\n- 已完成\n- 已结束\n\n文件/手动导入：\n\n- 升级设备总数\n- 已处理\n- 升级成功\n- 升级失败\n- 未处理\n- 支持展示成功、失败、未处理的分段进度条。\n\n指定版本全量：\n\n- 已匹配数\n- 升级成功\n- 升级失败\n- 成功占比：以已匹配数为分母\n- 失败占比：以已匹配数为分母\n- 不展示最终总数，不展示未知总数百分比。\n\n指定版本批量：\n\n- 计划成功下发数量\n- 已匹配数\n- 升级成功\n- 升级失败\n- 待匹配名额\n- 成功/失败占比以已匹配数为分母。\n\n### 7.5 异常分类\n\n展示条件：\n\n- 仅执行态且存在升级失败设备时展示。\n- 失败设备数为 0 时不展示异常分类模块。\n\n最小可行版本分类口径采用一级分类：\n\n- 设备升级过程失败\n- 升级前不满足条件\n- 升级数量限制\n- 任务和链路异常\n- 移动端主动升级相关\n- 设备上报失败信息\n\n图表要求：\n\n- 使用 ECharts 基础环形图，不使用南丁格尔玫瑰图。\n- 不使用圆角环形图强化效果。\n- 中心展示异常总数；鼠标移入图表扇区时展示当前分类名称、数量、占比。\n- 右侧展示分类列表，包含分类名称、数量、占比和横向占比条。\n- 鼠标移入右侧分类列表时，同步高亮环形图扇区并展示提示浮层。\n- 鼠标移入图表扇区时，同步高亮右侧分类项。\n- 支持下载异常明细。\n\n### 7.6 设备列表\n\n设备列表位于“升级明细”页签。\n\n展示规则：\n\n- 待发布、待审批、已驳回、已失效、待执行：展示空状态，不展示设备表格。\n- 升级中、已完成、已结束：展示设备列表。\n- 指定版本全量：只展示已动态匹配并进入下发链路的设备。\n- 指定版本批量：展示已匹配、已下发、升级结果和剩余名额相关状态。\n- 文件/手动导入：展示固定设备清单。\n\n列表上方工具栏：\n\n- 左侧为设备标识搜索。\n- 右侧为“导出设备列表”按钮。\n- 搜索与导出需保持同一行水平展示，空间不足时自然换行。\n- 去掉下方提示说明。\n\n表格字段：\n\n- 设备标识\n- 源版本\n- 目标版本\n- 所属大区\n- 下发状态\n- 升级状态\n- 完成时间\n- 失败原因\n- 最近上报时间\n\n## 8. 统计口径规则\n\n统计口径模拟按钮：\n\n```text\n文件导入 / 手动导入 / 指定版本全量 / 指定版本批量\n```\n\n### 文件导入\n\n- 设备总数已知。\n- 分母为设备清单总数。\n- 展示固定设备总数、已处理、升级成功、升级失败、未处理。\n\n### 手动导入\n\n- 设备总数已知。\n- 分母为手动录入设备总数。\n- 展示固定设备总数、已处理、升级成功、升级失败、未处理。\n\n### 指定版本全量\n\n- 设备执行中动态匹配。\n- 不展示最终总数百分比。\n- 展示已匹配数。\n- 可展示已匹配设备中的成功/失败数量和占比。\n\n示例：\n\n```text\n已匹配数：358 台\n升级成功：346 台，占已匹配 96.6%\n升级失败：12 台，占已匹配 3.4%\n```\n\n### 指定版本批量\n\n- 有计划成功下发数量。\n- 展示已匹配数 / 计划成功下发数量。\n- 展示待匹配名额。\n- 下发失败不占用匹配名额，系统持续匹配符合条件设备。\n\n示例：\n\n```text\n计划成功下发数量：5,000 台\n已匹配数：358 / 计划 5,000 台\n升级成功：346 台，占已匹配 96.6%\n升级失败：12 台，占已匹配 3.4%\n```\n\n## 9. 任务状态流转\n\n### UML 状态流转图\n\n```mermaid\nstateDiagram-v2\n  [*] --> 创建中: 新建任务\n  创建中 --> 待发布: 保存草稿\n  创建中 --> 待审批: 发布任务（需审批）\n  创建中 --> 待执行: 发布任务（无需审批）\n\n  待发布 --> 创建中: 编辑草稿\n  待发布 --> [*]: 删除草稿\n  待发布 --> 待审批: 发布任务（需审批）\n  待发布 --> 待执行: 发布任务（无需审批）\n\n  待审批 --> 待执行: 审批通过\n  待审批 --> 已驳回: 审批驳回\n  待审批 --> 已失效: 超过审批有效期\n\n  已驳回 --> 创建中: 复制重建\n  已失效 --> 创建中: 复制重建\n\n  待执行 --> 升级中: 到达任务开始时间\n  待执行 --> 已结束: 手动结束任务\n\n  升级中 --> 已完成: 执行周期内设备处理完成\n  升级中 --> 已结束: 手动结束任务\n  升级中 --> 已完成: 到达任务结束时间并完成收敛\n\n  已完成 --> [*]\n  已结束 --> [*]\n```\n\n说明：\n\n- `创建中` 为页面编辑态，不作为任务列表状态展示。\n- `待发布` 对应保存草稿后的列表状态。\n- 指定版本全量场景在 `升级中` 阶段持续动态匹配设备，最终设备数以执行结束后的已匹配数为准。\n- 文件/手动导入场景设备清单固定，进入执行阶段后按固定设备总数统计。\n- `已完成` 包含升级成功和升级失败设备，表示任务执行闭环完成，不代表所有设备均升级成功。\n- `已结束` 表示用户提前手动结束任务，不等同于审批驳回或任务失效。\n\n### 草稿路径\n\n```text\n新建任务 → 保存草稿 → 待发布 → 编辑 → 发布\n```\n\n### 审批路径\n\n```text\n发布任务 → 待审批 → 审批通过 → 待执行 → 升级中 → 已完成\n```\n\n### 驳回路径\n\n```text\n发布任务 → 待审批 → 审批驳回 → 已驳回 → 复制重建\n```\n\n### 失效路径\n\n```text\n发布任务 → 待审批 → 超过审批有效期 → 已失效 → 复制重建\n```\n\n### 手动结束路径\n\n```text\n待执行 / 升级中 → 结束任务 → 已结束\n```\n\n## 10. 风险与路线图\n\n### 最小可行版本\n\n- 完成新增任务三步流程。\n- 完成保存草稿、发布、提交审批的结果反馈。\n- 完成任务列表字段、筛选、分页、列设置和状态操作。\n- 完成任务详情“任务概览 / 升级明细”。\n- 完成升级概览、异常分类环形图、设备列表导出入口。\n- 完成状态模拟和统计口径模拟。\n\n### 1.1 版本\n\n- 接入真实任务列表和任务详情接口。\n- 接入审批流状态。\n- 接入升级明细、设备列表与流转明细接口。\n- 接入异常明细和设备列表导出。\n\n### 2.0 版本\n\n- 支持真实动态匹配统计。\n- 支持异常原因二级钻取和失败明细分析。\n- 支持按角色控制详情字段和操作权限。\n- 支持任务复盘、趋势分析和报表能力。\n\n### 技术风险\n\n- 指定版本动态匹配最终设备数不可预估，前后端必须避免展示固定总数。\n- 下发失败和升级失败必须严格区分，否则批量名额统计会错误。\n- 状态流转与审批流若不同步，列表和详情状态可能不一致。\n- 文件/手动导入设备清单涉及敏感设备标识，导出权限需严格控制。\n- ECharts 若采用内容分发网络加载，离线环境无法渲染图表；生产环境建议使用本地依赖或构建产物。\n\n## 11. 测试与验收\n\n核心验收用例：\n\n- 创建任务每一步必填校验生效。\n- 保存草稿后返回任务列表，状态为待发布，并支持编辑。\n- 发布成功不进入第 4 步，结果通过弹窗或消息反馈。\n- 指定版本全量下，详情页不展示未知总数百分比。\n- 指定版本全量升级中，升级概览显示“已匹配数 N 台”。\n- 指定版本全量完成后，展示“升级成功 N 台，失败 N 台”。\n- 指定版本批量下，展示计划成功下发数量、已匹配数、待匹配名额。\n- 文件/手动导入下，展示明确设备总数和成功/失败/未处理结果。\n- 任务列表分页可切换页码和每页条数。\n- 任务列表不同状态下操作按钮符合规则。\n- 详情页主页签为任务概览和升级明细。\n- 顶部任务概览卡不展示重复执行概览。\n- 升级明细中展示升级概览、异常分类、设备列表。\n- 异常分类使用 ECharts 基础环形图，并支持图表与分类列表鼠标悬停联动。\n- 设备列表导出按钮与搜索框位于同一工具栏。\n- 主详情页不展示操作记录，保留流转明细。\n\n## 12. 待确认问题\n\n- 后端是否能明确区分下发失败、升级失败、未处理三个字段。\n- 指定版本批量中的计划成功下发数量是否以“成功匹配”还是“成功下发”作为最终占用名额。\n- 指定版本全量完成后的最终已匹配数是否可作为历史实际设备数固化。\n- 文件导入和手动导入是否统一使用同一设备统计字段。\n- 审批超时失效规则由审批系统还是 OTA 系统计算。\n";

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
  state.packageType = "whole";
  state.strategy = "version";
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
    packageType: state.packageType,
    strategy: state.strategy,
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
  state.packageType = draft.packageType;
  state.strategy = draft.strategy;
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
  state.editingDraft = true;
  setRoute("create-task");
}

function clearUploadTimers() {
  uploadTimers.forEach(timer => window.clearTimeout(timer));
  uploadTimers = [];
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
  return `
    <section class="page requirements-page prd-doc-shell">
      <header class="prd-doc-header">
        <div>
          <span>产品需求文档</span>
          <h1>OTA 升级任务管理优化</h1>
          <p>本文档与原型页面中的需求打点批注保持同一份内容口径，供产品、研发、测试完整查阅。</p>
        </div>
        <button class="btn" type="button" data-route="task-list">返回任务列表</button>
      </header>
      <section class="prd-doc-content">
        ${renderMarkdownHtml(requirementsMarkdown)}
      </section>
    </section>
  `;
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
        <span>中国 / 杭州低功耗</span>${icon("chevron")}
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
        ${renderRequirementNote("PRD 1 / 6.2", "本次范围与状态统计", [
          "原型覆盖新增任务、任务列表、任务详情、升级统计口径、异常分类和模拟验证。",
          "状态统计只统计当前顶部大区，不做跨大区聚合查询。",
        ])}
      </div>
      <div class="annotated-block">
        ${renderTaskAreaStats()}
        ${renderRequirementNote("PRD 6.2", "状态统计卡片", [
          "展示当前任务大区和基础状态数量。",
          "待发布、待审批、升级中、已完成等状态需与列表筛选口径一致。",
        ])}
      </div>
      <div class="annotated-block">
        ${renderTaskFilters()}
        ${renderRequirementNote("PRD 6.1", "列表查询条件", [
          "查询条件顺序：任务名称、任务状态、升级方式、升级包、创建人、创建时间。",
          "筛选变更后列表重置到第一页，创建人支持输入和候选选择。",
        ])}
      </div>
      <div class="annotated-block">
        ${renderTaskTableToolbar()}
        ${renderRequirementNote("PRD 6.3 / 6.4", "列表字段与状态操作", [
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
    ["当前大区", "中国中心", "home"],
    ["任务总数", total, "layer"],
    ["待发布", state.draftTask ? 1 : 0, "log"],
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
  const draft = state.draftTask ? [{ status: "待发布" }] : [];
  return [...draft, ...taskListRows];
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
  const regions = draft.selectedRegions.length ? draft.selectedRegions.join("、") : "-";
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
  return [...new Set(taskRowsWithDraft().map(task => task.creator).filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
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
      <td title="${task.name}">${task.name}</td>
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
        ${renderRequirementNote("PRD 5.1", "新增任务三步流程", [
          "流程固定为基础信息、配置升级策略、预览发布。",
          "发布结果通过弹窗或消息反馈，不再进入独立完成步骤。",
          "每一步进入下一步前需校验当前步骤必填项。",
        ])}
      </div>
      <div class="workbench-shell">
        <div class="workbench-main">
          ${renderCreateStepContent()}
        </div>
      </div>
      <div class="annotated-block sticky-note-host">
        ${renderWizardActions()}
        ${renderRequirementNote("PRD 5.1", "草稿与发布反馈", [
          "保存草稿后返回任务列表，状态为待发布，并支持二次编辑。",
          "提交审批成功进入待审批；无需审批发布成功后按任务时间进入待执行或后续执行态。",
        ])}
      </div>
    </section>
  `;
}

function renderCreateSteps() {
  const steps = [
    ["基础信息", "填写任务信息"],
    ["配置升级策略", "选择升级包和范围"],
    ["预览发布", "查看预检结果"],
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
  if (state.createStep === 2) return renderStrategyStep();
  if (state.createStep === 3) return renderPreviewStep();
  return renderBasicInfoStep();
}

function renderBasicInfoStep() {
  return `
    <section class="workbench-card step-card">
      <div class="card-heading">
        <div>
          <span class="eyebrow">Step 1</span>
          <h3>基础信息</h3>
        </div>
      </div>
      ${renderRequirementNote("PRD 5.1", "基础信息必填规则", [
        "任务名称、任务执行大区、目标固件版本、任务起止时间、任务升级说明均为必填。",
        "过去日期不可选；默认开始时间为当前时间后 5 分钟。",
        "快捷周期固定为未来 7 天、30 天、90 天。",
      ])}
      <div class="form-grid element-form basic-info-form">
        <label class="field-stack basic-name-field ${state.errors.taskName ? "has-error" : ""}">
          ${renderRequirementNote("PRD 5.1", "任务名称字段要求", [
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
        <label class="field-stack basic-region-field ${state.errors.selectedRegions ? "has-error" : ""}">
          ${renderRequirementNote("PRD 5.1", "任务执行大区字段要求", [
            "必选，至少选择 1 个任务执行大区，支持大区及子集群多选。",
            "未选择提示：请选择任务执行大区。",
            "采用下拉级联多选，标签展示已选项，支持删除单个标签、全选、清空和高度自适应。",
          ])}
          <span><span class="required">*</span> 任务执行大区</span>
          <div class="select-field multi-select-field ${state.regionDropdownOpen ? "open" : ""}" data-action="toggle-region-dropdown">
            <div class="multi-select-values">
              ${renderSelectedRegionTags("请选择任务执行大区")}
            </div>
            ${icon("chevron", "select-arrow")}
            ${state.regionDropdownOpen ? renderRegionCascaderDropdown() : ""}
          </div>
          ${renderFieldError("selectedRegions")}
        </label>
        <label class="field-stack basic-version-field ${state.errors.targetVersion ? "has-error" : ""}">
          ${renderRequirementNote("PRD 5.1", "目标固件版本字段要求", [
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
          ${renderRequirementNote("PRD 5.1", "任务起止时间字段要求", [
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
          ${renderRequirementNote("PRD 5.1", "任务升级说明字段要求", [
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

function renderSelectedRegionTags(placeholder) {
  if (!state.selectedRegions.length) return `<span class="select-placeholder">${placeholder}</span>`;
  const visible = state.selectedRegions.slice(0, 3);
  const more = state.selectedRegions.length - visible.length;
  return `
    ${visible.map(region => `
      <span class="chip removable-chip">
        ${region}
        <button type="button" aria-label="移除 ${region}" data-action="remove-region" data-region="${region}">${icon("close")}</button>
      </span>
    `).join("")}
    ${more > 0 ? `<span class="chip muted-chip">+ ${more}</span>` : ""}
  `;
}

function renderRegionCascaderDropdown() {
  const selectedSet = new Set(state.selectedRegions);
  return `
    <div class="cascader-dropdown" data-stop>
      <div class="select-dropdown-tools">
        <button class="link-btn" type="button" data-action="select-all-regions">全选</button>
        <button class="link-btn" type="button" data-action="clear-regions">清空</button>
      </div>
      <div class="cascader-columns">
        <div class="cascader-column">
          ${regionTree.map(region => renderCascaderOption(region.label, region.label, selectedSet, true)).join("")}
        </div>
        <div class="cascader-column">
          ${regionTree.flatMap(region => (region.children || []).map(child => {
            const path = `${region.label} / ${child.label}`;
            return renderCascaderOption(child.label, path, selectedSet, Boolean(child.children));
          })).join("")}
        </div>
        <div class="cascader-column">
          ${regionTree.flatMap(region => (region.children || []).flatMap(child => (child.children || []).map(area => {
            const path = `${region.label} / ${child.label} / ${area.label}`;
            return renderCascaderOption(area.label, path, selectedSet, false);
          }))).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderCascaderOption(label, path, selectedSet, hasChildren) {
  return `
    <label class="cascader-option ${selectedSet.has(path) ? "checked" : ""}" data-action="toggle-region" data-region="${path}">
      <input type="checkbox" ${selectedSet.has(path) ? "checked" : ""} />
      <span>${label}</span>
      ${hasChildren ? icon("back", "cascader-next") : ""}
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
          <h3>配置升级策略</h3>
        </div>
        <span class="soft-pill">策略选择后，仅展示相关配置项</span>
      </div>
      ${renderRequirementNote("PRD 5.2 / 5.3", "策略配置规则", [
        "升级方式支持指定版本、文件导入、手动导入。",
        "指定版本不再拆分三个规则切换，统一通过源版本表格勾选。",
        "全量展示全量；批量只支持统一输入数量，不支持单版本分别输入。",
      ])}
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
      <div class="config-section">
        <h4>选择升级策略</h4>
        <div class="strategy-grid">
          ${strategyCard("version", "指定版本号升级", "按当前指定源版本批量升级到目标版本，适合正式灰度与区域筛选。", ["版本范围", "批量控制", "可灰度"])}
          ${strategyCard("file", "文件导入升级", "上传 CSV / Excel 设备清单，适合运营定向升级和名单制发布。", ["CSV/Excel", "自动校验", "可下载异常"])}
          ${strategyCard("manual", "手动导入升级", "最多 10 台，适合灰度测试、单台验证或临时处理。", ["≤10台", "实时校验", "测试友好"])}
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
      ${renderRequirementNote("PRD 5.6", "预览发布场景", [
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
        ? `<button class="btn primary" type="button" data-action="next-create-step">${state.createStep === 1 ? "下一步：配置升级策略" : "下一步：预览发布"}</button>`
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
        <p>先选择可升级源版本，再设置全量 / 批量策略。</p>
      </div>
      <span class="soft-pill blue-pill">已选择 ${state.selectedVersions.length} 个源版本</span>
    </div>
    <div class="rule-panel">
      ${renderFieldError("strategy")}
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

function renderFileStrategy(packageLabel) {
  return `
    <div class="config-panel-heading">
      <div>
        <strong>文件导入升级配置</strong>
        <p>上传设备清单后，系统会自动完成设备识别与发布预检。</p>
      </div>
      <div class="template-actions">
        <button class="btn" type="button" data-action="download-template">下载 CSV 模板</button>
        <button class="btn" type="button" data-action="download-template">下载 Excel 模板</button>
      </div>
    </div>
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
          <p>${isChecking ? "正在匹配设备大区、源固件版本与升级包可用性。" : `已上传 ${state.uploadProgress}%，请稍候。`}</p>
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
          <p>适合小范围验证；最多 10 台，设备 ID 输入后实时校验。</p>
        </div>
        <span class="manual-count-pill">当前 ${count} / 10 台</span>
      </div>
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
  return `
    <div class="condition-panel">
      <div class="condition-row">
        <span class="condition-label">策略条件</span>
        <label class="checkbox-line condition-check"><input type="checkbox" ${state.conditionRegionEnabled ? "checked" : ""} data-action="toggle-condition-region-enabled" /> 指定地区</label>
        <div class="select-field condition-operator ${state.regionOperatorOpen ? "open" : ""} ${disabled ? "disabled" : ""}" data-action="toggle-region-operator">
          <span>${state.regionOperator}</span>
          ${icon("chevron", "select-arrow")}
          ${state.regionOperatorOpen && !disabled ? `
            <div class="operator-dropdown" data-stop>
              ${["等于", "不等于"].map(option => `
                <button class="${state.regionOperator === option ? "active" : ""}" type="button" data-action="set-region-operator" data-operator="${option}">${option}</button>
              `).join("")}
            </div>
          ` : ""}
        </div>
        <div class="select-field multi-select-field condition-cascader ${state.conditionRegionDropdownOpen ? "open" : ""} ${disabled ? "disabled" : ""}" data-action="toggle-condition-region-dropdown">
          <div class="multi-select-values">
            ${disabled ? `<span class="select-placeholder">未启用指定地区</span>` : renderSelectedRegionTags("请选择地区")}
          </div>
          ${icon("chevron", "select-arrow")}
          ${state.conditionRegionDropdownOpen && !disabled ? renderRegionCascaderDropdown() : ""}
        </div>
      </div>
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
        ${renderRequirementNote("PRD 7.2", "顶部任务概览卡", [
          "顶部卡片关注任务本身，状态标签放在任务名称旁边。",
          "展示任务标识、创建人、更新时间、任务说明、目标版本、任务时间、任务大区、升级方式、升级包和策略条件。",
          "不展示重复执行概览，不放查看升级明细按钮，避免与页签导航重复。",
        ])}
      </div>
      <div class="annotated-block compact-note-block">
        ${renderDetailTabs()}
        ${renderRequirementNote("PRD 7.1", "详情页信息架构", [
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
          ${renderRequirementNote("PRD 7.4 / 8", "升级概览统计口径", [
            "文件/手动导入展示固定设备总数、已处理、成功、失败、未处理。",
            "指定版本全量只展示已匹配数、成功数、失败数，不展示未知总数百分比。",
            "指定版本批量展示计划成功下发数量、已匹配数和待匹配名额。",
          ])}
        </div>
        <div class="annotated-block">
          ${renderExceptionSummary(detail)}
          ${renderRequirementNote("PRD 7.5", "异常分类", [
            "仅执行态且存在失败设备时展示。",
            "使用 6 个一级异常分类和 ECharts 基础环形图。",
            "图表与分类列表支持鼠标悬停联动，并提供下载异常明细入口。",
          ])}
        </div>
        <div class="annotated-block">
          ${renderDeviceDetailTable(detail)}
          ${renderRequirementNote("PRD 7.6", "设备列表", [
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
      ${renderRequirementNote("PRD 7.3 / 9", "任务进度与流转明细", [
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
    region: "中国 / 杭州低功耗",
    desc: modeConfig.desc,
    sourceScope: modeConfig.sourceScope,
    sourceVersions: modeConfig.sourceVersions || [],
    condition: modeConfig.condition,
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
      <div class="task-overview-head">
        <div class="task-overview-titlemark">${icon("refresh")}</div>
        <div class="task-overview-title">
          <div class="task-title-line"><h2>${detail.name}</h2>${statusTag(detail.status)}</div>
          <p>任务 ID：OTA-20260610-0008 · 创建人：${detail.creator} · 更新时间：${detail.updatedAt}</p>
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
      <section class="task-overview-middle">
        ${renderTaskStrategyPanel(detail)}
        ${renderTaskConditionPanel(detail)}
      </section>
    </div>
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
  const isVersionMode = isVersionFullDetailMode() || isVersionBatchDetailMode();
  const sourceTitle = isVersionMode ? "指定源版本" : "设备来源";
  const sourceContent = isVersionMode ? renderTaskSourceVersions(detail, state.detailSourceExpanded ? Infinity : 4) : detail.sourceScope;
  const hasMore = isVersionMode && (detail.sourceVersions?.length || 0) > 4;
  return `
    <section class="task-condition-panel">
      <div class="task-panel-title">
        <h3>策略条件</h3>
        ${hasMore ? `<button class="link-btn" type="button" data-action="toggle-detail-source">${state.detailSourceExpanded ? "收起" : "展开全部"}</button>` : ""}
      </div>
      <div class="condition-summary-grid">
        <dl><dt>指定地区</dt><dd><span class="condition-chip">${detail.region}</span></dd></dl>
        <dl><dt>${sourceTitle}</dt><dd>${sourceContent}</dd></dl>
      </div>
    </section>
  `;
}

function overviewDeviceScale(detail) {
  if (isVersionFullDetailMode()) return "全量";
  if (isVersionBatchDetailMode()) return `${Number(plannedBatchTotal()).toLocaleString()} 台`;
  return `${Number(detail.total).toLocaleString()} 台`;
}

function overviewDispatchText(detail) {
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
  const taskStatus = isManual ? manualPublishStatus() : meta.nextStatus;
  const title = isManual ? "任务发布成功" : "任务已提交审批";
  const desc = isManual
    ? "OTA 升级任务已创建，系统将在任务时间窗口内执行。"
    : "OTA 升级任务已创建并提交审批，审批通过后将在任务时间窗口内执行。";
  const flowNotes = isManual
    ? [
      ["当前状态", taskStatus === "升级中" ? "任务已到达开始时间，进入升级中。" : "任务已进入待执行，未到开始时间前不会下发。", "clock"],
      ["执行规则", "到达任务开始时间后系统自动下发 OTA；执行结果可在任务详情的升级明细中查看。", "refresh"],
      ["后续操作", "关闭弹窗或返回任务列表后，可通过任务详情持续查看任务流转与设备升级结果。", "info"],
    ]
    : [
      ["当前状态", "任务已进入待审批，审批通过前不会进入执行队列，也不会下发 OTA。", "shield"],
      ["审批结果", "审批通过后按任务时间进入待执行或升级中；若审批驳回或超时失效，任务不会下发。", "clock"],
      ["后续操作", "关闭弹窗或返回任务列表后，可在待审批任务中查看详情，等待产线负责人处理。", "info"],
    ];

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
    return {
      bad: 0,
      good: 0,
      total: 0,
      alertClass: "success",
      alertTitle: "指定版本升级任务待提交审批",
      alertText: "请确认升级包、源版本范围、任务大区和策略条件；审批通过后进入执行窗口。",
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

  const text = state.quantityMode === "full"
    ? "全量任务在执行期按源版本、区域和策略条件动态匹配设备，预览阶段不统计固定设备总数，实际设备数以执行结果为准。"
    : "批量任务使用统一计划成功下发数量，系统会在选定源版本和区域内持续匹配符合条件设备。";

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
  const regions = state.selectedRegions.length
    ? state.selectedRegions.map(region => `<span class="mini-tag blue">${region}</span>`).join("")
    : "-";
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
            <dt>任务执行大区：</dt><dd class="preview-tag-list">${regions}</dd>
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
            <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>${state.packageType === "diff" ? "无可用差分包：源版本未匹配差分基线" : "设备不在任务执行大区或机型不匹配"}</span><span class="mini-tag">${state.previewScenario === "blocked" ? Math.floor(data.bad * 0.58) : Math.max(data.bad - 2, 0)}台</span></div>
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
        <header class="modal-header"><span id="regionTitle">选择地区</span><button class="modal-close" data-action="close-modal">${icon("close")}</button></header>
        <div class="modal-body">
          <div class="region-picker-panel">
            <div class="region-picker-toolbar">
              <span class="text-muted">已选择 ${state.selectedRegions.length} 个地区</span>
              <div>
                <button class="link-btn" type="button" data-action="select-all-regions">全选</button>
                <button class="link-btn" type="button" data-action="clear-regions">清空</button>
              </div>
            </div>
            <div class="region-option-list">
              ${regionOptions.map(region => `
                <label class="region-option" data-action="toggle-region" data-region="${region}">
                  <input type="checkbox" ${state.selectedRegions.includes(region) ? "checked" : ""} />
                  <span>${region}</span>
                </label>
              `).join("")}
            </div>
            <div class="suggestion">${icon("info")} 支持多选地区；未选择时默认按任务执行大区下发。</div>
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
      if (["toggle-region", "remove-region", "select-all-regions", "clear-regions", "toggle-version", "toggle-all-versions", "remove-device", "clear-date-range"].includes(action)) {
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

  root.querySelectorAll("[data-package-card]").forEach(el => {
    el.addEventListener("click", () => {
      state.packageType = el.dataset.packageCard;
      delete state.errors.strategy;
      render();
    });
  });

  root.querySelectorAll("[data-strategy]").forEach(el => {
    el.addEventListener("click", () => {
      state.strategy = el.dataset.strategy;
      delete state.errors.strategy;
      delete state.errors.fileUpload;
      delete state.errors.manualDevices;
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
    if (!state.form.taskName.trim()) errors.taskName = "请输入任务名称";
    if (!state.selectedRegions.length) errors.selectedRegions = "请选择任务执行大区";
    if (!state.form.targetVersion) errors.targetVersion = "请选择目标固件版本";
    if (!state.taskStartAt || !state.taskEndAt) errors.taskTime = "请选择任务起止时间";
    if (!state.form.upgradeDesc.trim()) errors.upgradeDesc = "请输入任务升级说明";
  }
  if (step === 2) {
    if (!state.packageType) errors.strategy = "请选择升级包类型";
    if (!state.strategy) errors.strategy = "请选择升级策略";
    if (state.strategy === "version" && !state.selectedVersions.length) errors.strategy = "请至少选择一个源版本";
    if (state.strategy === "version" && state.quantityMode === "batch" && Number(state.batchQuantity) <= 0) errors.batchQuantity = "请输入大于 0 的统一下发数量";
    if (state.strategy === "file" && state.fileUploadStatus !== "uploaded") errors.fileUpload = "请先上传设备清单";
    if (state.strategy === "manual" && !state.manualDevices.some(device => device.deviceId && device.status === "可升级")) errors.manualDevices = "请至少添加一台可升级设备";
    if (state.conditionRegionEnabled && !state.selectedRegions.length) errors.conditionRegion = "请选择指定地区";
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
      state.regionOperatorOpen = !state.regionOperatorOpen;
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      render();
      break;
    case "toggle-condition-region-enabled":
      state.conditionRegionEnabled = !state.conditionRegionEnabled;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      if (!state.conditionRegionEnabled) delete state.errors.conditionRegion;
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
        state.selectedRegions = [...state.selectedRegions, region];
      }
      delete state.errors.selectedRegions;
      delete state.errors.conditionRegion;
      render();
      break;
    }
    case "remove-region": {
      const region = el.dataset.region;
      state.selectedRegions = state.selectedRegions.filter(item => item !== region);
      if (state.selectedRegions.length) delete state.errors.selectedRegions;
      render();
      break;
    }
    case "select-all-regions":
      state.selectedRegions = [...regionOptions];
      delete state.errors.selectedRegions;
      delete state.errors.conditionRegion;
      render();
      break;
    case "clear-regions":
      state.selectedRegions = [];
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
    case "confirm-region":
      closeModal();
      state.regionDropdownOpen = false;
      showToast("地区条件已更新");
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
