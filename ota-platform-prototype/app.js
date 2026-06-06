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
  dispatchRegions: ["中国 / 杭州低功耗", "香港"],
  packageType: "whole",
  strategy: "version",
  previewScenario: "mixed",
  quantityMode: "full",
  taskScope: "current",
  syncRegions: ["中国", "香港"],
  batchLimit: 500,
  maxDispatchTotal: "",
  createStep: 1,
  regionDropdownOpen: false,
  conditionRegionDropdownOpen: false,
  conditionRegionEnabled: false,
  regionOperatorOpen: false,
  regionOperator: "等于",
  strategyConditionEnabled: false,
  strategyConditions: [
    { id: 1, field: "设备标签", operator: "等于", values: "" },
  ],
  strategyConditionNextId: 2,
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
  createdTasks: [],
  taskOverrides: {},
  lastPublishedTaskId: "",
  selectedTaskId: "",
  detailStatus: "升级中",
  detailMetricMode: "versionFull",
  detailTab: "overview",
  detailRegionTab: "",
  detailDeviceKeyword: "",
  detailSourceExpanded: false,
  showRequirementNotes: false,
  visibleTaskColumns: {
    method: true,
    packageType: true,
    targetVersion: true,
    total: true,
    time: true,
    result: true,
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
const chinaDispatchChildren = ["中国 / 杭州", "中国 / 杭州低功耗", "中国 / 深圳", "中国 / 成都", "中国 / 上海（宠物）"];
const dispatchRegionGroups = [
  { label: "中国", desc: "覆盖全部中国子节点", children: chinaDispatchChildren },
  { label: "香港", desc: "父级大区", children: [] },
  { label: "法兰福克", desc: "父级大区", children: [] },
  { label: "硅谷", desc: "父级大区", children: [] },
];
const dispatchRegionOptionSet = new Set(dispatchRegionGroups.flatMap(group => [group.label, ...group.children]));
const strategyConditionFields = ["设备标签", "设备型号", "渠道", "客户", "地区", "设备分组"];
const strategyConditionOperators = ["等于", "不等于", "包含", "不包含"];

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
  { id: "OTA202606030001", name: "IPC-中国安全补丁指定版本升级", method: "指定版本", quantityMode: "full", packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-06-10 09:00:00~2026-06-17 09:00:00", result: null, region: "中国", dispatchRegions: ["中国"], status: "待审批", creator: "汤彦珊", createdAt: "2026-06-03 17:20:18" },
  { id: "OTA202606030002", name: "杭州低功耗灰度定时升级", method: "指定版本", quantityMode: "batch", planned: 5000, batchLimit: 500, maxDispatchTotal: 5000, packageType: "差分包", targetVersion: "23.422.209.17", total: null, time: "2026-06-04 10:00:00~2026-06-11 10:00:00", result: null, region: "中国/杭州低功耗", dispatchRegions: ["中国 / 杭州低功耗"], status: "待执行", creator: "江锐", createdAt: "2026-06-03 16:42:05" },
  { id: "OTA202606010001", name: "文件导入_法兰福克补丁升级", method: "文件导入", packageType: "整包", targetVersion: "23.422.209.17", total: "664", time: "2026-06-01 18:59:01~2026-06-30 18:59:01", result: { success: 346, failed: 0, total: 664 }, region: "法兰福克", status: "升级中", creator: "钱江涛", createdAt: "2026-06-01 18:02:14" },
  { id: "OTA202605130001", name: "低功耗设备夜间唤醒修复", method: "指定版本", quantityMode: "full", packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-05-13 11:25:20~2026-06-02 11:25:20", result: { matched: 6505, success: 6488, failed: 17 }, region: "中国/杭州低功耗", dispatchRegions: ["中国 / 杭州低功耗"], status: "已完成", creator: "江锐", createdAt: "2026-05-13 11:22:42" },
  { id: "OTA202605190001", name: "黑光升级双光测试", method: "文件导入", packageType: "差分包", targetVersion: "23.110.105.46", total: "1196", time: "2026-05-19 16:33:42~2026-06-19 16:33:42", result: { success: 730, failed: 8, total: 1196 }, region: "中国/杭州", status: "已结束", creator: "钱江涛", createdAt: "2026-05-19 16:31:18" },
  { id: "OTA202605090002", name: "华拓测试数据异常明细", method: "文件导入", packageType: "整包", targetVersion: "23.422.209.17", total: "327", time: "2026-05-09 16:51:20~2026-08-09 16:51:20", result: null, region: "中国/杭州低功耗", status: "已驳回", creator: "江锐", createdAt: "2026-05-09 16:49:28" },
  { id: "OTA202605090001", name: "审批超时_香港安全补丁升级", method: "指定版本", quantityMode: "full", packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-05-09 16:40:34~2026-06-09 16:40:34", result: null, region: "香港", dispatchRegions: ["香港"], status: "已失效", creator: "汤彦珊", createdAt: "2026-05-09 16:37:40" },
  { id: "OTA202605080001", name: "硅谷摄像机批量灰度", method: "指定版本", quantityMode: "batch", planned: 800, batchLimit: 200, maxDispatchTotal: 800, packageType: "整包", targetVersion: "23.422.209.17", total: null, time: "2026-05-08 10:00:00~2026-05-18 10:00:00", result: { matched: 640, success: 620, failed: 20 }, region: "硅谷", dispatchRegions: ["硅谷"], status: "升级中", creator: "江锐", createdAt: "2026-05-08 09:42:16" },
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
  ["2026-05-09 16:49:28", "测试数据异常明细", "江锐", "审批驳回", "已驳回", "目标版本与升级策略不一致"],
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
    desc: "按源版本和指定分发范围动态匹配设备。",
    nextStatus: "待审批",
    sourceLabel: "已配置版本表格",
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
    nextStatus: "待审批",
    sourceLabel: "已导入设备清单",
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
    desc: "录入少量设备，适合灰度测试或单台处理。",
    nextStatus: "待执行",
    sourceLabel: "已配置手动设备列表",
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

const requirementsMarkdown = "# OTA 升级任务管理优化 PRD\n\n## 01. 本次需求范围\n\n本次需求聚焦 OTA 升级任务从创建、发布、执行到详情复盘的完整链路。新版原型以“减少创建时的大区选择负担、保留详情复盘的大区信息”为核心原则。\n\n| 范围 | 内容 |\n| --- | --- |\n| 新增任务 | 基本任务、策略配置、预览发布、保存草稿、提交审批或确认发布 |\n| 升级方式 | 指定版本、文件导入、手动导入 |\n| 大区规则 | 文件/手动按设备 ID 所属大区由后端自动分发；指定版本创建时选择指定分发范围 |\n| 任务列表 | 状态展示、字段展示、筛选、列设置、分页、状态操作；移除全局区域上下文入口和列表区域列 |\n| 任务详情 | 任务概览、策略信息、升级明细、设备所属大区、异常分类、流转明细 |\n\n## 02. 方案结论\n\n新增任务采用三步流程：\n\n| 步骤 | 页面目标 | 关键展示 |\n| --- | --- | --- |\n| 基本任务 | 先录入任务公共信息 | 任务名称、目标固件版本、升级包、任务时间、升级说明 |\n| 策略配置 | 再选择升级方式并配置策略 | 指定版本 / 文件导入 / 手动导入，以及各自策略字段 |\n| 预览发布 | 最后确认预检和发布动作 | 任务摘要、可升级数、异常明细、提交审批或确认发布 |\n\n关键结论：\n\n- 去掉全局区域上下文入口，任务列表不按大区过滤。\n- 任务列表不展示任务区域字段。\n- 文件导入和手动导入创建时不选择大区；后端根据设备 ID 所属大区自动分发。\n- 指定版本仍需在策略配置中选择指定分发范围，因为设备中心当前没有统一查询设备 ID 所属大区的接口。\n- 指定版本分发范围支持多选父级大区，也支持展开中国并选择中国子节点。\n- 所有策略的设备下发不做大区校验过滤；大区信息只用于任务详情、设备明细和复盘统计展示。\n\n## 03. 创建任务设计\n\n### 3.1 基本任务\n\n| 字段 | 要求 |\n| --- | --- |\n| 任务名称 | 必填，1-64 个字符，不允许只输入空格 |\n| 目标固件版本 | 必填，只能选择已上架或已生成升级包版本 |\n| 升级包 | 必填，整包 / 差分包 |\n| 任务时间 | 必填，开始时间不得早于当前时间，结束时间必须晚于开始时间 |\n| 任务升级说明 | 必填，1-500 个有效字符，展示字数统计 |\n\n基本任务步骤不展示任何大区选择。\n\n### 3.2 策略配置\n\n| 升级方式 | 创建时大区规则 | 策略字段 | 发布流转 |\n| --- | --- | --- | --- |\n| 指定版本 | 必须选择指定分发范围 | 指定分发范围、源版本、全量/批量、单批下发数量、任务最大下发数量 | 提交审批 |\n| 文件导入 | 不选择大区 | 设备清单文件、导入总数、可升级数、异常数 | 提交审批 |\n| 手动导入 | 不选择大区 | 设备 ID、源版本、所属大区、校验状态 | 直接发布 |\n\n所有升级方式均支持配置可选策略条件项：\n\n- 策略条件项默认关闭，非必填，不影响进入预览发布和提交发布。\n- 开启后可新增一条或多条条件项，每条条件包含条件项、操作符和条件值，用于后端策略匹配或定制化下发控制。\n- 条件项可覆盖设备标签、设备型号、渠道、客户、地区、设备分组等业务维度。\n- 策略条件项不作为大区校验过滤；即使条件项选择地区，也仅作为业务条件记录和匹配，不拦截设备所属大区。\n- 预览发布和详情需展示已配置的策略条件；未配置时展示“未配置”或不展示条件明细。\n\n指定版本的分发范围选择规则：\n\n- 指定版本可以选择多个分发范围。\n- 可选父级大区为中国、香港、法兰福克、硅谷等。\n- 中国支持展开选择杭州、杭州低功耗、深圳、成都、上海（宠物）等子节点。\n- 选择“中国”父级表示覆盖全部中国子节点。\n- 只选择部分中国子节点时，中国父级展示半选态。\n- 香港、法兰福克、硅谷当前作为叶子节点处理。\n- 分发范围用于后端匹配指定版本设备范围，并在详情页按范围拆分展示执行情况。\n- 指定版本执行时不做额外设备级大区过滤校验。\n\n指定版本批量数量规则：\n\n| 字段 | 含义 | 默认 |\n| --- | --- | --- |\n| 单批下发数量 | 每轮最多下发多少台，用于控制灰度节奏 | 必填，大于 0 |\n| 任务最大下发数量 | 本任务累计最多下发多少台，达到后停止继续匹配新设备 | 不限制 |\n\n- 单批下发数量对整个任务生效，不按大区分别乘算。\n- 任务最大下发数量对整个任务生效，不按大区分别乘算。\n- 多个大区实际消耗数量由设备满足条件和系统匹配顺序决定。\n- 若达到任务最大下发数量，系统停止匹配新设备；已下发设备全部有最终结果后，任务可提前完成。\n- 若未设置任务最大下发数量，任务持续动态匹配，直到任务结束时间、无可匹配设备或用户手动结束。\n\n文件导入和手动导入的大区规则：\n\n- 创建时不展示大区选择控件。\n- 上传或录入设备 ID 后，可展示设备所属大区作为校验辅助信息。\n- 发布后由后端按设备 ID 所属大区分发到对应大区。\n- 设备区域归属不再作为创建拦截原因，不提示用户切换区域后再创建。\n\n### 3.3 预览发布\n\n| 内容 | 展示要求 |\n| --- | --- |\n| 基本信息摘要 | 任务名称、目标版本、升级包、任务时间、升级说明 |\n| 策略摘要 | 升级方式、指定版本分发范围或自动按设备大区分发说明 |\n| 设备规模 | 指定版本展示全量、批量单批数量、任务最大下发数量；文件/手动展示清单总数、可升级数、异常数 |\n| 异常明细 | 展示已是目标版本、差分包不可用、版本不匹配、设备不存在等原因 |\n| 发布动作 | 指定版本/文件导入为提交审批；手动导入为确认发布 |\n\n异常原因中不再包含区域不匹配类拦截。\n\n### 3.4 草稿规则\n\n- 基本任务或策略配置过程中均可保存草稿。\n- 草稿进入列表状态为“待发布”。\n- 待发布任务支持编辑和删除。\n- 草稿再次编辑时回到保存时的步骤。\n- 切换升级方式时，仅保留基本任务信息，策略私有配置按新方式重新配置。\n\n### 3.5 创建任务校验\n\n| 校验对象 | 校验时机 | 校验规则 |\n| --- | --- | --- |\n| 基本任务 | 进入策略配置、提交发布 | 任务名称、目标版本、升级包、任务时间、升级说明必填 |\n| 指定版本策略 | 进入预览发布、提交发布 | 必须选择指定分发范围，至少选择一个源版本；批量模式下单批下发数量必须大于 0，任务最大下发数量默认可不填；若填写任务最大下发数量，必须大于等于单批下发数量 |\n| 文件导入策略 | 进入预览发布、提交发布 | 必须上传设备清单，且存在可升级设备 |\n| 手动导入策略 | 进入预览发布、提交发布 | 至少 1 台可升级设备，最多 10 台，设备 ID 不允许重复 |\n\n## 04. 任务状态定义\n\n![OTA 任务状态流转图](assets/ota-task-lifecycle-flow.svg)\n\n| 状态 | 业务含义 | 进入条件 | 可操作项 | 退出条件 |\n| --- | --- | --- | --- | --- |\n| 待发布 | 草稿态，任务未正式提交 | 保存草稿；编辑草稿后再次保存 | 编辑、删除、提交发布 | 指定版本/文件导入提交后进入待审批；手动导入确认发布后进入待执行或升级中 |\n| 待审批 | 已提交审批，尚未允许执行 | 指定版本或文件导入提交发布且预检通过 | 详情 | 审批通过进入待执行或升级中；审批驳回进入已驳回；审批超时或执行窗口失效进入已失效 |\n| 待执行 | 已发布，等待计划开始时间 | 审批通过但未到开始时间；手动导入发布成功但未到开始时间 | 详情 | 到达开始时间进入升级中；开始前任务窗口失效进入已失效 |\n| 升级中 | 任务正在匹配、下发或等待设备回执 | 到达开始时间且任务窗口有效 | 详情、结束任务 | 全部纳入执行的设备产生最终结果或达到提前完成条件进入已完成；用户结束进入已结束；任务窗口结束后停止继续匹配并进入已完成 |\n| 已完成 | 系统正常结束，任务不可再执行 | 执行窗口结束；固定清单全部处理完成；指定版本达到任务最大下发数量且已下发设备全部有最终结果；无新的可匹配设备且执行链路已收敛 | 详情、复制重建 | 终态 |\n| 已结束 | 用户提前终止，系统不再继续匹配或下发 | 升级中状态下用户确认结束任务 | 详情、复制重建 | 终态 |\n| 已驳回 | 审批未通过，任务不执行 | 审批人驳回发布申请 | 详情、复制重建 | 终态 |\n| 已失效 | 任务未进入可执行链路且窗口已不可用 | 审批超时；审批通过时任务结束时间已过；待执行阶段到达结束时间仍未启动 | 详情、复制重建 | 终态 |\n\n状态流转规则：\n\n- 待发布是唯一可编辑原任务配置的状态；进入待审批、待执行或升级中后不允许修改原任务配置。\n- 删除仅允许待发布草稿，不作为任务终态进入详情。\n- 指定版本和文件导入必须先进入待审批；手动导入无需审批，发布后按任务时间直接进入待执行或升级中。\n- 审批通过时若当前时间早于开始时间，进入待执行；若当前时间处于开始和结束时间之间，直接进入升级中；若结束时间已过，进入已失效。\n- 待执行阶段不提供结束任务操作，因为尚未形成执行链路和设备下发记录。\n- 升级中执行结束后进入已完成；用户主动结束进入已结束，后端需停止后续匹配和新增下发，但已下发设备的最终回执仍可在详情中更新。\n- 已完成、已结束、已驳回、已失效均为终态，只允许查看详情和复制重建。\n\n## 05. 三种升级方式流程\n\n新增任务统一采用三步创建流程：\n\n![新增任务三步流程图](assets/ota-create-task-flow.svg)\n\n### 5.1 指定版本\n\n![指定版本下发业务流程图](assets/ota-specified-current-region-flow.svg)\n\n指定版本适用于根据分发范围、源版本和策略条件动态圈选设备的任务。由于设备中心当前没有统一查询设备 ID 所属大区的接口，创建时必须选择指定分发范围。\n\n| 阶段 | 处理规则 | 产出 |\n| --- | --- | --- |\n| 策略配置 | 选择一个或多个分发范围；支持中国父级、中国子节点，以及香港、法兰福克、硅谷等父级或叶子大区 | dispatchRegions |\n| 版本配置 | 选择一个或多个源版本；目标版本来自基本任务 | sourceVersions、targetVersion |\n| 数量配置 | 选择全量或批量；批量必填单批下发数量；任务最大下发数量默认不限制 | quantityMode、batchLimit、maxDispatchTotal |\n| 策略条件 | 可选配置设备标签、型号、渠道、客户、地区、设备分组等条件项 | strategyCondition |\n| 预览发布 | 校验分发范围、源版本、时间窗口和批量数量；展示策略摘要 | previewSnapshot |\n| 审批 | 提交审批，审批通过后按任务时间进入待执行或升级中 | approvalRecord |\n| 执行 | 后端按分发范围、源版本、策略条件动态匹配设备；批量任务按全局单批数量和全局最大下发数量控制节奏 | regionExecution、deviceExecution |\n| 详情复盘 | 升级明细按分发范围 tab 查看，不提供全部聚合 tab | regionStats、deviceList |\n\n指定版本分发拆分规则：\n\n![指定版本多范围执行拆分流程图](assets/ota-specified-cross-region-flow.svg)\n\n- 选择“中国”父级时，任务配置记录父级选择，执行和详情按中国子节点拆分展示。\n- 选择部分中国子节点时，只对已选子节点建立分区执行记录。\n- 香港、法兰福克、硅谷作为独立分发范围展示。\n- 多个分发范围共用同一个任务最大下发数量；达到最大下发数量后停止匹配新设备。\n- 全量模式不展示未知总量和未处理数；批量模式展示单批下发数量、任务最大下发数量和已下发进度。\n- 所有策略条件只参与业务匹配，不作为大区校验过滤。\n\n### 5.2 文件导入\n\n![文件导入下发业务流程图](assets/ota-file-import-flow.svg)\n\n文件导入适用于运营人员上传固定设备清单的任务。创建时不选择大区，后端按设备 ID 所属大区自动拆分执行。\n\n| 阶段 | 处理规则 | 产出 |\n| --- | --- | --- |\n| 文件上传 | 上传设备 ID 清单，系统解析、去重并校验格式 | uploadRecord、rawDeviceList |\n| 设备校验 | 校验设备是否存在、当前版本、是否已是目标版本、差分包是否可用 | precheckResult、exceptionList |\n| 大区识别 | 根据设备 ID 查询设备所属大区，仅作为拆分执行和详情展示字段 | deviceRegion |\n| 策略条件 | 可选配置策略条件项；条件项不拦截设备所属大区 | strategyCondition |\n| 预览发布 | 展示导入总数、去重后总数、可升级数、异常数和异常原因 | previewSnapshot |\n| 审批 | 提交审批，审批通过后进入待执行或升级中 | approvalRecord |\n| 执行 | 后端按设备所属大区拆分子执行单，下发到对应大区 | regionExecution、deviceExecution |\n| 详情复盘 | 升级明细按设备所属大区 tab 查看概览、异常和设备列表，不提供跨大区聚合明细 | regionStats、deviceList |\n\n文件导入异常原因中不得包含区域不匹配、非当前大区、请切换大区等旧口径。\n\n### 5.3 手动导入\n\n![手动导入下发业务流程图](assets/ota-manual-import-flow.svg)\n\n手动导入适用于小规模、临时性的固定设备升级任务。创建时不选择大区，最多录入 10 台设备，发布后直接进入执行链路。\n\n| 阶段 | 处理规则 | 产出 |\n| --- | --- | --- |\n| 手动录入 | 输入设备 ID，支持逐条校验，最多 10 台，不允许重复 | manualDevices |\n| 设备校验 | 实时查询源版本、设备所属大区、是否可升级和异常原因 | validationStatus、exceptionList |\n| 策略条件 | 可选配置策略条件项；未配置不影响发布 | strategyCondition |\n| 预览发布 | 展示设备清单、可升级数、异常数和设备所属大区 | previewSnapshot |\n| 直接发布 | 无需审批；确认发布后按任务时间进入待执行或升级中 | publishRecord |\n| 执行 | 后端按设备所属大区拆分执行并下发 | regionExecution、deviceExecution |\n| 详情复盘 | 升级明细按设备所属大区 tab 查看概览、异常和设备列表，不提供跨大区聚合明细 | regionStats、deviceList |\n\n## 06. 字段与记录要求\n\n### 6.1 任务主记录字段\n\n| 字段 | 中文名 | 适用范围 | 要求 |\n| --- | --- | --- | --- |\n| taskId | 任务 ID | 全部 | 系统生成，列表、详情、流转记录统一使用 |\n| taskName | 任务名称 | 全部 | 必填，1-64 个有效字符 |\n| upgradeMethod | 升级方式 | 全部 | specified_version / file_import / manual_import |\n| packageType | 升级包类型 | 全部 | full / diff |\n| packageId | 升级包 ID | 全部 | 关联升级包记录，用于下发 |\n| targetVersion | 目标固件版本 | 全部 | 必填，只能选择已上架或已生成升级包版本 |\n| taskStartAt | 任务开始时间 | 全部 | 必填，不得早于当前时间 |\n| taskEndAt | 任务结束时间 | 全部 | 必填，必须晚于开始时间 |\n| description | 任务升级说明 | 全部 | 必填，1-500 个有效字符 |\n| status | 任务状态 | 全部 | 待发布、待审批、待执行、升级中、已完成、已结束、已驳回、已失效 |\n| draftStep | 草稿所在步骤 | 待发布 | 保存草稿时记录，编辑草稿时回到对应步骤 |\n| approvalRequired | 是否需要审批 | 全部 | 指定版本、文件导入为是；手动导入为否 |\n| dispatchMode | 分发模式 | 全部 | 指定版本为 selected_region；文件/手动为 device_owner_region_auto |\n| dispatchRegions | 指定分发范围 | 指定版本 | 记录父级大区和中国子节点；文件/手动为空 |\n| quantityMode | 数量模式 | 指定版本 | full / batch |\n| batchLimit | 单批下发数量 | 指定版本批量 | 必填，大于 0 |\n| maxDispatchTotal | 任务最大下发数量 | 指定版本批量 | 可为空；为空表示不限制 |\n| deviceTotalDisplay | 升级规模展示值 | 全部 | 指定版本全量展示“全量”；其他展示 N 台 |\n| creator / createdAt / updatedAt | 创建信息 | 全部 | 记录创建人、创建时间、更新时间 |\n| submittedAt | 提交发布时间 | 待审批及之后 | 指定版本、文件导入提交审批时记录；手动导入发布时记录 |\n| approvedAt / approver | 审批通过信息 | 审批通过任务 | 记录审批人和审批通过时间 |\n| rejectedAt / rejectReason | 驳回信息 | 已驳回 | 记录驳回时间和原因 |\n| expiredAt / expireReason | 失效信息 | 已失效 | 记录失效时间和原因 |\n| startedAt | 实际开始时间 | 升级中及之后 | 任务进入升级中时记录 |\n| completedAt / completeReason | 完成信息 | 已完成 | 记录完成时间和完成原因 |\n| endedAt / endReason | 结束信息 | 已结束 | 记录用户结束时间和结束原因 |\n\n### 6.2 策略配置字段\n\n| 策略 | 字段 | 说明 |\n| --- | --- | --- |\n| 指定版本 | dispatchRegions[] | 指定分发范围，支持父级大区和中国子节点 |\n| 指定版本 | sourceVersions[] | 源版本，可多选 |\n| 指定版本 | quantityMode | full 表示全量；batch 表示批量 |\n| 指定版本 | batchLimit | 单批下发数量，仅批量必填 |\n| 指定版本 | maxDispatchTotal | 任务最大下发数量，空值表示不限制 |\n| 文件导入 | fileId / fileName | 上传文件标识和文件名 |\n| 文件导入 | uploadTotal | 文件原始行数 |\n| 文件导入 | dedupedTotal | 去重后设备数 |\n| 文件导入 | upgradeableTotal | 可升级设备数 |\n| 文件导入 | exceptionTotal | 预检异常设备数 |\n| 文件导入 | importBatchId | 文件解析批次，用于追溯解析结果 |\n| 手动导入 | manualDevices[] | 手动录入设备列表 |\n| 手动导入 | manualTotal | 录入设备数，最大 10 |\n| 手动导入 | upgradeableTotal | 可升级设备数 |\n| 手动导入 | exceptionTotal | 校验异常设备数 |\n| 通用策略条件 | strategyCondition.enabled | 是否启用自定义策略条件，默认 false |\n| 通用策略条件 | strategyCondition.items[] | 条件项列表，非必填 |\n| 通用策略条件 | items[].field | 条件字段，如设备标签、设备型号、渠道、客户、地区、设备分组 |\n| 通用策略条件 | items[].operator | 操作符，如等于、不等于、包含、不包含、在范围内 |\n| 通用策略条件 | items[].values | 条件值，支持单值或多值 |\n| 通用策略条件 | items[].relation | 条件间关系，本期默认为 AND |\n\n### 6.3 策略条件字段\n\n| 字段 | 说明 | 展示要求 |\n| --- | --- | --- |\n| conditionId | 条件唯一标识 | 后端生成或前端临时生成后提交 |\n| fieldCode / fieldName | 条件字段编码和名称 | 页面展示名称，接口传编码 |\n| operator | 操作符 | 与字段类型匹配 |\n| valueCodes / valueLabels | 条件值编码和展示名 | 多选时按数组存储 |\n| valueType | 值类型 | string / number / enum / region / tag |\n| enabled | 是否启用 | 关闭后不参与匹配 |\n| validationStatus | 条件校验状态 | 非必填项；失败时提示但不默认拦截其他策略 |\n| createdAt / updatedAt | 条件更新时间 | 用于详情复盘 |\n\n策略条件展示规则：\n\n- 创建页仅提供配置控件，不展示规则性说明文案。\n- 预览发布展示已配置条件摘要；未配置时展示“未配置”。\n- 详情页展示任务真实配置的策略条件，并支持通过评审口径快速切换查看不同策略条件下的页面状态。\n- 条件字段即使选择地区，也不等同于任务大区校验，不产生区域不匹配异常。\n\n### 6.4 预检与异常字段\n\n| 字段 | 说明 | 适用范围 |\n| --- | --- | --- |\n| precheckId | 预检批次 ID | 全部 |\n| precheckTotal | 参与预检设备数 | 文件导入、手动导入；指定版本可展示预估或不展示未知总数 |\n| upgradeableCount | 可升级设备数 | 全部 |\n| blockedCount | 异常设备数 | 全部 |\n| exceptionType | 异常类型 | 已是目标版本、差分包不可用、版本不匹配、设备不存在、设备离线、设备状态不允许升级等 |\n| exceptionLevel | 异常级别 | blocking / warning |\n| deviceId | 设备标识 | 文件导入、手动导入、执行明细 |\n| currentVersion | 当前固件版本 | 文件导入、手动导入、执行明细 |\n| sourceVersionMatched | 是否命中源版本 | 全部 |\n| deviceRegionCode / deviceRegionName | 设备所属大区 | 文件导入、手动导入、执行明细 |\n| canPublish | 是否允许发布 | 全部 |\n| checkedAt | 预检时间 | 全部 |\n\n### 6.5 分区执行字段\n\n| 字段 | 说明 | 展示要求 |\n| --- | --- | --- |\n| regionExecutionId | 分区执行 ID | 每个分发范围或设备所属大区生成一条 |\n| taskId | 任务 ID | 关联主任务 |\n| regionCode / regionName | 执行大区 | 指定版本为分发范围拆分结果；文件/手动为设备所属大区 |\n| parentRegionCode / parentRegionName | 父级大区 | 中国子节点需记录父级中国 |\n| selectedScopeLabel | 创建时选择范围 | 用于说明是父级覆盖还是子节点直选 |\n| executionStatus | 分区执行状态 | 待执行、升级中、已完成、已结束、已失效 |\n| matchedCount | 已匹配设备数 | 指定版本动态匹配统计 |\n| dispatchedCount | 已下发设备数 | 已实际下发到设备的数量 |\n| successCount | 升级成功数 | 当前分区统计 |\n| failedCount | 升级失败数 | 当前分区统计 |\n| upgradingCount | 升级中数 | 当前分区统计 |\n| pendingCount | 未处理数 | 固定清单任务展示；指定版本全量可不展示 |\n| successRate | 成功率 | successCount / 已处理数 |\n| lastSyncedAt | 最近更新时间 | 当前分区数据更新时间 |\n| finishReason | 分区完成原因 | 正常完成、用户结束、达到最大下发数量、执行窗口结束等 |\n\n### 6.6 设备明细字段\n\n| 字段 | 说明 | 展示要求 |\n| --- | --- | --- |\n| deviceId | 设备 ID | 必展示 |\n| taskId / regionExecutionId | 任务和分区执行关联 | 用于按大区 tab 查询 |\n| sourceVersion | 源版本 | 指定版本为命中源版本；文件/手动为校验时当前版本 |\n| targetVersion | 目标版本 | 必展示 |\n| packageType | 升级包类型 | 整包 / 差分包 |\n| deviceRegionName | 设备所属大区 | 必展示 |\n| dispatchRegionName | 实际下发大区 | 文件/手动应与设备所属大区一致；指定版本为当前分区 |\n| batchNo | 下发批次 | 批量任务展示 |\n| precheckStatus | 预检状态 | 可升级 / 异常 |\n| deliveryStatus | 下发状态 | 未下发、下发中、下发成功、下发失败 |\n| upgradeStatus | 升级状态 | 未开始、升级中、成功、失败 |\n| failureCategory | 失败分类 | 包下载失败、设备离线、版本不匹配、安装失败、超时等 |\n| failureReason | 失败原因 | 失败时展示 |\n| dispatchedAt / reportedAt / finishedAt | 时间信息 | 最近上报时间必展示 |\n\n### 6.7 流转记录字段\n\n| 字段 | 说明 |\n| --- | --- |\n| flowId | 流转记录 ID |\n| taskId | 任务 ID |\n| fromStatus / toStatus | 流转前后状态 |\n| action | 保存草稿、提交审批、审批通过、审批驳回、开始执行、结束任务、系统完成、系统失效 |\n| operatorType | user / system / approval |\n| operatorName | 操作人或系统名称 |\n| operatedAt | 操作时间 |\n| reason | 驳回、结束、失效、完成等原因 |\n| snapshot | 本次流转时的关键字段快照 |\n\n## 07. 列表页承接规则\n\n任务列表展示全部任务，不提供全局区域上下文入口，不按大区过滤，不展示任务区域列。\n\n| 字段 | 展示规则 |\n| --- | --- |\n| 名称 | 展示任务名称、任务 ID、必要状态标签 |\n| 升级方式 | 指定版本 / 文件导入 / 手动导入 |\n| 升级包 | 整包 / 差分包 |\n| 目标版本 | 展示目标固件版本号 |\n| 升级规模 | 指定版本全量展示“全量”；批量、文件导入、手动导入展示 N 台 |\n| 任务时间 | 展示开始和结束时间 |\n| 执行结果 | 非执行态展示 `-`；执行态按各策略统计口径展示 |\n| 状态 | 展示待发布、待审批、待执行、升级中、已完成等 |\n| 创建人 | 展示任务创建人 |\n| 创建时间 | 展示任务创建时间 |\n| 操作 | 按状态展示编辑、删除、详情、结束任务、复制重建 |\n\n## 08. 详情页承接规则\n\n详情页展示任务本身的完整配置和执行结果。大区信息只在详情页中作为复盘信息出现。\n\n![详情页分区升级明细查看流程图](assets/ota-china-detail-flow.svg)\n\n| 策略 | 详情大区展示 |\n| --- | --- |\n| 指定版本 | 展示指定分发范围，并按大区/子节点拆分执行情况 |\n| 文件导入 | 展示“按设备所属大区自动分发”，并展示设备所属大区分布 |\n| 手动导入 | 展示“按设备所属大区自动分发”，并展示设备所属大区分布 |\n\n指定版本详情的分区升级明细放在“升级明细”页签最上方展示，不在任务概览页签重复展示：\n\n- 按创建时选择的父级大区或中国子节点拆分。\n- 若选择“中国”父级，详情按中国子节点展开展示。\n- 每个分发范围需展示执行状态、已匹配、已下发、成功、失败、升级中、成功率和最近更新时间。\n- 批量任务需展示单批下发数量和任务最大下发数量；任务最大下发数量为不限制时，展示“不限制”。\n- 当前后端无法跨大区汇集设备明细和执行结果，因此升级明细不提供“全部”聚合 tab，也不展示跨分发范围的统一概览。\n- 升级明细默认进入第一个分发范围；页面最上方提供各分发范围 tab，切换 tab 后同步切换当前分区概览、当前分区升级概览、当前分区异常明细和当前分区设备列表。\n- 指定版本升级明细中的统计卡片、异常分类、设备搜索和导出均基于当前选中的分发范围，不支持在页面上切换到全部范围。\n- 指定版本已结束时，当前分区设备列表仅展示已匹配或已下发到该分区链路的设备；未继续匹配的新设备不进入设备明细表。\n- 文件导入和手动导入的设备所属大区分布放在“升级明细”页签内展示，不在任务概览中重复展示执行统计。\n- 从真实任务进入详情后，评审视图默认带入任务自身策略口径，但需保留文件导入、手动导入、指定版本全量、指定版本批量的快速切换能力，用于查阅各策略条件下的状态页面；切换评审口径不修改真实任务配置。\n\n详情页状态与操作规则：\n\n| 状态 | 任务概览 | 升级明细 | 详情页操作 |\n| --- | --- | --- | --- |\n| 待审批 | 展示任务配置、提交审批记录和等待审批节点 | 展示待审批空态，不展示升级概览、异常分类和设备列表 | 无 |\n| 已驳回 | 展示驳回原因、审批流转和任务配置 | 展示已驳回空态，不展示升级概览、异常分类和设备列表 | 复制重建 |\n| 已失效 | 展示失效原因、审批流转和任务配置 | 展示已失效空态，不展示升级概览、异常分类和设备列表 | 复制重建 |\n| 待执行 | 展示计划开始时间和等待执行节点 | 展示待执行空态，不展示升级概览、异常分类和设备列表 | 无 |\n| 升级中 | 展示执行中状态和流转记录 | 展示升级概览、异常分类和设备列表；指定版本按当前分发范围展示 | 结束任务 |\n| 已完成 | 展示完成时间和最终流转记录 | 展示最终升级概览、异常分类和设备列表；指定版本按当前分发范围展示 | 复制重建 |\n| 已结束 | 展示结束时间、结束原因和最终流转记录 | 固定清单展示结束前已处理设备和未继续下发设备；指定版本仅展示已进入当前分区链路的设备 | 复制重建 |\n\n统计口径要求：\n\n- 已匹配数 / 已处理数 = 升级成功数 + 升级失败数 + 升级中数。\n- 未处理数 = 固定清单总数 - 已处理数；指定版本全量不展示未知总数和未处理数。\n- 固定清单任务的进度条需区分成功、失败、升级中和未处理。\n- 异常分类仅在执行态且存在失败设备时展示。\n\n设备明细表必须包含设备 ID、源版本、目标版本、所属大区、下发状态、升级状态、失败原因、最近上报时间。\n\n## 09. 验收标准\n\n### 9.1 新增任务\n\n| 验收点 | 标准 |\n| --- | --- |\n| 步骤流程 | 新增任务按基本任务、策略配置、预览发布三步完成 |\n| 基本任务 | 不出现大区选择 |\n| 指定版本 | 必须选择至少一个指定分发范围，支持父级大区和中国子节点 |\n| 指定版本批量 | 支持配置单批下发数量；支持配置任务最大下发数量，默认不限制；达到最大下发数量后停止继续匹配新设备 |\n| 策略条件项 | 三种升级方式均可配置多条策略条件项；默认非必填；未配置时不影响发布 |\n| 文件导入 | 不选择大区，上传后提示按设备所属大区自动分发 |\n| 手动导入 | 不选择大区，录入后展示设备所属大区 |\n| 预览发布 | 不出现区域范围拦截类旧口径 |\n\n### 9.2 列表页\n\n| 验收点 | 标准 |\n| --- | --- |\n| 全局区域上下文 | 不展示区域切换入口 |\n| 列表字段 | 不展示任务区域字段 |\n| 列表筛选 | 不按大区过滤 |\n| 状态统计 | 统计全部任务，不按大区聚合 |\n\n### 9.3 详情页\n\n| 验收点 | 标准 |\n| --- | --- |\n| 指定版本 | 在升级明细最上方展示指定分发范围 tab 和分区升级明细，不提供全部范围 tab |\n| 指定版本批量 | 在升级明细中展示单批下发数量、任务最大下发数量，以及按分发范围 tab 拆分的升级结果 |\n| 状态操作 | 待执行详情页不展示结束任务；升级中展示结束任务；已完成、已结束、已驳回、已失效展示复制重建 |\n| 非执行态空态 | 待审批、已驳回、已失效、待执行不展示升级概览、异常分类和设备列表 |\n| 策略条件项 | 展示任务创建时配置的策略条件项；未配置时不作为异常或拦截原因 |\n| 文件/手动 | 展示自动按设备所属大区分发 |\n| 设备列表 | 指定版本按当前分发范围展示设备列表，文件/手动展示设备所属大区 |\n| 异常分类 | 不包含区域不匹配类异常 |\n\n## 10. 原型自测清单\n\n| 自测类型 | 检查内容 |\n| --- | --- |\n| 代码可用性 | `app.js` 无语法错误，页面入口可加载 |\n| 文案一致性 | 页面不再出现已废弃的区域上下文、区域范围拦截等旧口径 |\n| 交互覆盖 | 新增任务、保存草稿、发布弹窗、列表筛选、详情切换、导出、结束任务均可用 |\n| 状态覆盖 | 待发布、待审批、待执行、升级中、已完成、已结束、已驳回、已失效均可展示 |\n| 策略覆盖 | 指定版本、文件导入、手动导入均可切换查看 |\n| 响应式覆盖 | 大屏、中屏、小屏下表单、列表、详情无明显溢出 |\n";

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
  state.dispatchRegions = ["中国 / 杭州低功耗", "香港"];
  state.packageType = "whole";
  state.strategy = "version";
  state.taskScope = "current";
  state.syncRegions = ["中国", "香港"];
  state.previewScenario = "mixed";
  state.quantityMode = "full";
  state.batchLimit = 500;
  state.maxDispatchTotal = "";
  state.createStep = 1;
  state.conditionRegionEnabled = false;
  state.regionOperator = "等于";
  state.strategyConditionEnabled = false;
  state.strategyConditions = defaultStrategyConditions();
  state.strategyConditionNextId = 2;
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
    dispatchRegions: [...state.dispatchRegions],
    packageType: state.packageType,
    strategy: state.strategy,
    taskScope: state.taskScope,
    syncRegions: [...state.syncRegions],
    previewScenario: state.previewScenario,
    quantityMode: state.quantityMode,
    batchLimit: state.batchLimit,
    maxDispatchTotal: state.maxDispatchTotal,
    conditionRegionEnabled: state.conditionRegionEnabled,
    regionOperator: state.regionOperator,
    strategyConditionEnabled: state.strategyConditionEnabled,
    strategyConditions: normalizeStrategyConditionRows(state.strategyConditions).map(row => ({ ...row })),
    strategyConditionNextId: state.strategyConditionNextId,
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
  state.dispatchRegions = normalizeDispatchRegions(draft.dispatchRegions || draft.dispatchRegion || draft.topRegion || ["中国"]);
  state.packageType = draft.packageType;
  state.strategy = draft.strategy;
  state.taskScope = draft.taskScope || "current";
  state.syncRegions = draft.syncRegions?.length ? [...draft.syncRegions] : ["中国", "香港"];
  state.previewScenario = draft.previewScenario;
  state.quantityMode = draft.quantityMode;
  state.batchLimit = Number(draft.batchLimit ?? draft.batchQuantity ?? 500);
  state.maxDispatchTotal = draft.maxDispatchTotal ?? "";
  state.conditionRegionEnabled = draft.conditionRegionEnabled;
  state.regionOperator = draft.regionOperator;
  restoreStrategyConditionState(draft);
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
  if (state.strategy === "version") return normalizeDispatchRegions(state.dispatchRegions);
  return [];
}

function normalizeRegionName(region) {
  return String(region || "").replace(/\s*\/\s*/g, " / ").trim();
}

function normalizeDispatchRegions(regions) {
  const input = Array.isArray(regions) ? regions : [regions];
  const normalized = input
    .map(normalizeRegionName)
    .filter(Boolean)
    .filter(region => dispatchRegionOptionSet.has(region));
  return [...new Set(normalized)];
}

function taskDispatchRegions(task) {
  if (!task) return normalizeDispatchRegions(state.dispatchRegions);
  if (task.dispatchRegions?.length) return normalizeDispatchRegions(task.dispatchRegions);
  if (task.dispatchRegion) return normalizeDispatchRegions(task.dispatchRegion);
  if (task.region && task.method === "指定版本") return normalizeDispatchRegions(task.region);
  return [];
}

function expandedDispatchRegions(regions) {
  const normalized = normalizeDispatchRegions(regions);
  const expanded = normalized.flatMap(region => region === "中国" ? chinaDispatchChildren : [region]);
  return [...new Set(expanded)];
}

function dispatchRegionSummary(regions) {
  const normalized = normalizeDispatchRegions(regions);
  if (!normalized.length) return "未选择";
  if (normalized.length === 1) return normalized[0];
  return `${normalized.slice(0, 2).join("、")}${normalized.length > 2 ? ` 等 ${normalized.length} 个范围` : ""}`;
}

function renderDispatchRegionTags(regions, limit = 4) {
  const normalized = normalizeDispatchRegions(regions);
  if (!normalized.length) return "-";
  const visible = normalized.slice(0, limit);
  const rest = normalized.length - visible.length;
  return `
    ${visible.map(region => `<span class="condition-chip">${escapeHtml(region)}</span>`).join("")}
    ${rest > 0 ? `<span class="condition-chip muted">+${rest}</span>` : ""}
  `;
}

function renderMiniDispatchRegionTags(regions) {
  return renderMiniRegionTags(normalizeDispatchRegions(regions));
}

function dispatchQuantitySummary(source = state) {
  if (source.quantityMode !== "batch") return "全量动态匹配";
  const batchLimit = Number(source.batchLimit ?? source.batchQuantity ?? 0);
  const maxTotal = source.maxDispatchTotal === "" || source.maxDispatchTotal == null ? "" : Number(source.maxDispatchTotal);
  return `单批 ${Number(batchLimit || 0).toLocaleString()} 台 · 最大下发 ${maxTotal ? `${Number(maxTotal).toLocaleString()} 台` : "不限制"}`;
}

function defaultStrategyConditions() {
  return [{ id: 1, field: "设备标签", operator: "等于", values: "" }];
}

function normalizeStrategyConditionRows(rows = []) {
  const normalized = (Array.isArray(rows) ? rows : [])
    .map((row, index) => ({
      id: Number(row.id || index + 1),
      field: strategyConditionFields.includes(row.field) ? row.field : "设备标签",
      operator: strategyConditionOperators.includes(row.operator) ? row.operator : "等于",
      values: String(row.values ?? "").trim(),
    }))
    .filter(row => row.id);
  return normalized.length ? normalized : defaultStrategyConditions();
}

function configuredStrategyConditionRows(source = state) {
  if (!source.strategyConditionEnabled) return [];
  return normalizeStrategyConditionRows(source.strategyConditions).filter(row => row.values);
}

function restoreStrategyConditionState(source = {}) {
  const legacyRow = source.strategyConditionField || source.strategyConditionOperator || source.strategyConditionValues
    ? [{
      id: 1,
      field: source.strategyConditionField,
      operator: source.strategyConditionOperator,
      values: source.strategyConditionValues,
    }]
    : null;
  const rows = normalizeStrategyConditionRows(source.strategyConditions || legacyRow || defaultStrategyConditions());
  state.strategyConditionEnabled = Boolean(source.strategyConditionEnabled);
  state.strategyConditions = rows;
  state.strategyConditionNextId = Number(source.strategyConditionNextId || Math.max(...rows.map(row => row.id), 1) + 1);
}

function strategyConditionText(source = state) {
  const rows = configuredStrategyConditionRows(source);
  if (!rows.length) return "未配置";
  return rows.map(row => {
    const values = row.values ? ` ${row.values}` : "";
    return `${row.field} ${row.operator}${values}`;
  }).join("；");
}

function strategyConditionRecord() {
  const rows = configuredStrategyConditionRows();
  return {
    enabled: rows.length > 0,
    items: rows.map(row => ({ ...row })),
    text: strategyConditionText(),
  };
}

function updateStrategyConditionRow(id, patch) {
  const rowId = Number(id);
  state.strategyConditions = normalizeStrategyConditionRows(state.strategyConditions).map(row => (
    row.id === rowId ? { ...row, ...patch } : row
  ));
}

function plannedBatchTotal(task = null) {
  if (task) {
    const taskMaxTotal = task.maxDispatchTotal ?? task.planned ?? "";
    return taskMaxTotal === "" || taskMaxTotal == null ? 0 : Number(taskMaxTotal) || 0;
  }
  const selectedTask = findTaskById(state.selectedTaskId);
  if (selectedTask) {
    const taskMaxTotal = selectedTask.maxDispatchTotal ?? selectedTask.planned ?? "";
    return taskMaxTotal === "" || taskMaxTotal == null ? 0 : Number(taskMaxTotal) || 0;
  }
  const maxTotal = selectedTask?.maxDispatchTotal ?? selectedTask?.planned ?? state.maxDispatchTotal;
  if ((maxTotal === "" || maxTotal == null) && state.detailMetricMode === "versionBatch") return 5000;
  return maxTotal === "" || maxTotal == null ? 0 : Number(maxTotal) || 0;
}

function batchLimitForTask(task = null) {
  if (task) return Number(task.batchLimit ?? task.batchQuantity ?? 0) || 0;
  const selectedTask = findTaskById(state.selectedTaskId);
  const limit = selectedTask?.batchLimit ?? selectedTask?.batchQuantity ?? state.batchLimit;
  if ((limit === "" || limit == null) && state.detailMetricMode === "versionBatch") return 500;
  return Number(limit ?? 0) || 0;
}

function regionTopName(region) {
  const normalized = String(region || "").replace(/\s+/g, "");
  if (normalized.startsWith("中国")) return "中国";
  if (normalized.startsWith("香港")) return "香港";
  if (normalized.startsWith("法兰福克")) return "法兰福克";
  if (normalized.startsWith("硅谷")) return "硅谷";
  return "";
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
  return "";
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
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      closeList();
      html.push(renderMarkdownImage(image[1], image[2]));
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

function renderMarkdownImage(alt, src) {
  const safeSrc = resolveMarkdownAssetPath(src.trim());
  return `
    <div class="prd-doc-image-wrap">
      <img src="${escapeHtml(safeSrc)}" alt="${escapeHtml(alt)}" loading="lazy" />
    </div>
  `;
}

function resolveMarkdownAssetPath(src) {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/") || src.startsWith("data:")) return src;
  return src.replace(/^\.\/assets\//, "../docs/assets/").replace(/^assets\//, "../docs/assets/");
}

function formatInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderRequirementNote(section, title, items) {
  return "";
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
        ${renderRequirementNote("PRD 01 / 11", "本次范围与状态统计", [
          "原型覆盖新增任务、任务列表、任务详情、升级统计口径、异常分类和模拟验证。",
          "状态统计覆盖全部任务，不再按区域上下文过滤。",
          "记录字段至少包含任务 ID、任务名称、升级方式、目标版本、状态、创建人和创建时间。",
        ])}
      </div>
      <div class="annotated-block">
        ${renderTaskAreaStats()}
        ${renderRequirementNote("PRD 11", "状态统计卡片", [
          "展示全部任务和基础状态数量。",
          "待发布、待审批、升级中、已完成等状态需与列表筛选口径一致。",
        ])}
      </div>
      <div class="annotated-block">
        ${renderTaskFilters()}
        ${renderRequirementNote("PRD 11", "列表查询条件", [
          "查询条件顺序：任务名称、任务状态、升级方式、升级包、创建人、创建时间。",
          "筛选变更后列表重置到第一页，创建人支持输入和候选选择。",
          "查询动作不读取大区上下文；重置动作清空筛选并恢复第一页。",
        ])}
      </div>
      <div class="annotated-block">
        ${renderTaskTableToolbar()}
        ${renderRequirementNote("PRD 11", "列表字段与状态操作", [
          "列表默认按创建时间倒序，不展示更新时间。",
          "升级设备数统一展示 N 台或全量，非执行态执行结果展示 -。",
          "操作规则：待发布编辑/删除，升级中详情/结束任务，已驳回和已失效详情/复制重建。",
          "列设置需记录用户选择的显示列；刷新只重新拉取列表数据，不改变筛选条件。",
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
  return taskRowsWithDraft();
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
  const rows = [...state.createdTasks, ...taskListRows].map(applyTaskOverride);
  if (state.draftTask) rows.push(draftTaskAsRow());
  return rows;
}

function taskRows() {
  return taskRowsWithDraft();
}

function applyTaskOverride(task) {
  const override = state.taskOverrides[task.id];
  return override ? { ...task, ...override } : task;
}

function findTaskById(taskId) {
  if (!taskId) return null;
  return taskRows().find(task => task.id === taskId) || null;
}

function taskIdFromElement(el) {
  return el?.dataset?.taskId || el?.closest?.("[data-task-row]")?.dataset?.taskRow || "";
}

function selectTask(taskId) {
  if (!taskId) return null;
  const task = findTaskById(taskId);
  if (!task) return null;
  state.selectedTaskId = task.id;
  syncDetailControlsFromTask(task);
  return task;
}

function resetDetailViewContext(options = {}) {
  if (options.tab) state.detailTab = options.tab;
  state.detailRegionTab = "";
  state.detailDeviceKeyword = "";
  state.detailSourceExpanded = false;
}

function syncDetailControlsFromTask(task) {
  if (!task) return;
  state.detailStatus = task.status === "待发布" ? "待执行" : task.status;
  state.detailMetricMode = detailMetricModeForTask(task);
  normalizeDetailStatusForMode();
  resetDetailViewContext({ tab: "overview" });
}

function detailMetricModeForTask(task) {
  if (task.method === "手动导入") return "manual";
  if (task.method === "文件导入") return "file";
  if (task.syncBatchId || task.syncRegions?.length) return "versionSync";
  if (task.quantityMode === "batch") return "versionBatch";
  return "versionFull";
}

function displayTaskRegion(task) {
  return task.region;
}

function generateTaskId() {
  const date = formatDate(new Date()).replace(/-/g, "");
  const existing = taskRows().filter(task => String(task.id).includes(date)).length + 1;
  return `OTA${date}${String(existing).padStart(4, "0")}`;
}

function generateSyncBatchId() {
  const date = formatDate(new Date()).replace(/-/g, "");
  const existing = state.createdTasks.filter(task => task.syncBatchId).length + 1;
  return `SYNC-${date}-${String(existing).padStart(4, "0")}`;
}

function publishCurrentTask() {
  const task = buildPublishedTask();
  state.createdTasks = [task, ...state.createdTasks.filter(item => item.id !== task.id)];
  state.lastPublishedTaskId = task.id;
  state.selectedTaskId = task.id;
  state.taskFilters = defaultTaskFilters();
  state.taskPage = 1;
  state.taskCreatorDropdownOpen = false;
  state.draftTask = null;
  state.editingDraft = false;
  syncDetailControlsFromTask(task);
  return task;
}

function buildPublishedTask() {
  const meta = strategyMeta[state.strategy];
  const isManual = state.strategy === "manual";
  const isSync = isSyncCreateTask();
  const status = isManual ? manualPublishStatus() : meta.nextStatus;
  const createdAt = formatDateTime(new Date());
  const selectedVersionText = state.selectedVersions.length ? state.selectedVersions.join("、") : "-";
  const executionRegions = currentExecutionRegions();
  const total = publishedTaskTotalText();
  const maxDispatchTotal = state.maxDispatchTotal === "" || state.maxDispatchTotal == null ? "" : Number(state.maxDispatchTotal);
  return {
    id: generateTaskId(),
    name: state.form.taskName.trim() || "未命名任务",
    method: meta.short,
    strategy: state.strategy,
    quantityMode: state.strategy === "version" ? state.quantityMode : "fixed",
    planned: state.strategy === "version" && state.quantityMode === "batch" && maxDispatchTotal ? maxDispatchTotal : null,
    batchLimit: state.strategy === "version" && state.quantityMode === "batch" ? Number(state.batchLimit || 0) : null,
    maxDispatchTotal: state.strategy === "version" && state.quantityMode === "batch" ? maxDispatchTotal : "",
    packageType: state.packageType === "whole" ? "整包" : "差分包",
    targetVersion: state.form.targetVersion,
    total,
    time: `${state.taskStartAt}~${state.taskEndAt}`,
    result: null,
    region: state.strategy === "version" ? dispatchRegionSummary(executionRegions) : "按设备所属大区自动分发",
    topRegion: state.topRegion,
    dispatchRegion: state.strategy === "version" ? dispatchRegionSummary(executionRegions) : "",
    dispatchRegions: state.strategy === "version" ? executionRegions : [],
    status,
    creator: "汤彦珊",
    createdAt,
    updatedAt: createdAt,
    submittedAt: createdAt,
    desc: state.form.upgradeDesc.trim(),
    condition: publishedTaskConditionText(),
    strategyCondition: strategyConditionRecord(),
    sourceScope: publishedTaskSourceScope(selectedVersionText),
    sourceVersions: [...state.selectedVersions],
    syncBatchId: "",
    syncRegions: null,
    isLocal: true,
  };
}

function publishedTaskTotalText() {
  if (state.strategy === "version") {
    if (state.quantityMode !== "batch") return null;
    const maxDispatchTotal = Number(state.maxDispatchTotal || 0);
    return maxDispatchTotal ? String(maxDispatchTotal) : null;
  }
  if (state.strategy === "manual") {
    return String(state.manualDevices.filter(device => device.deviceId && device.status === "可升级").length);
  }
  return String(state.uploadDeviceCount || strategyMeta.file.devices);
}

function publishedTaskConditionText() {
  const customCondition = strategyConditionText();
  if (state.strategy === "version") {
    return `指定分发范围 = ${dispatchRegionSummary(state.dispatchRegions)}；${dispatchQuantitySummary()}${customCondition !== "未配置" ? `；策略条件：${customCondition}` : ""}`;
  }
  return `按设备所属大区自动分发${customCondition !== "未配置" ? `；策略条件：${customCondition}` : ""}`;
}

function publishedTaskSourceScope(selectedVersionText) {
  if (state.strategy === "version") return selectedVersionText;
  if (state.strategy === "manual") {
    const devices = state.manualDevices
      .filter(device => device.deviceId && device.status === "可升级")
      .map(device => device.deviceId);
    return `手动录入设备：${devices.join("、") || "-"}`;
  }
  return state.uploadFileName ? `已导入设备清单：${state.uploadFileName}` : "已导入设备清单";
}

function publishedEndResultForTask(task) {
  if (task.method === "指定版本") {
    const planned = Number(task.planned || 0);
    const matched = planned || 730;
    return {
      matched,
      success: Math.max(matched - 8, 0),
      failed: Math.min(8, matched),
    };
  }
  const total = Number(task.total || 0);
  const success = Math.max(total - 1, 0);
  return { total, success, failed: total ? 1 : 0 };
}

function restoreTaskForRebuild(task) {
  if (!task) return;
  state.topRegion = task.topRegion || regionTopName(task.region) || state.topRegion;
  state.dispatchRegions = taskDispatchRegions(task).length ? taskDispatchRegions(task) : ["中国"];
  state.strategy = task.strategy || ({
    "指定版本": "version",
    "文件导入": "file",
    "手动导入": "manual",
  }[task.method] || "version");
  state.packageType = task.packageType === "差分包" ? "diff" : "whole";
  state.form.taskName = `${task.name} - 复制`;
  state.form.targetVersion = task.targetVersion || state.form.targetVersion;
  state.form.upgradeDesc = task.desc || state.form.upgradeDesc;
  state.taskStartAt = taskStartFromRow(task) || state.taskStartAt;
  state.taskEndAt = taskEndFromRow(task) || state.taskEndAt;
  state.quantityMode = task.quantityMode === "batch" ? "batch" : "full";
  state.batchLimit = batchLimitForTask(task) || state.batchLimit;
  state.maxDispatchTotal = task.maxDispatchTotal ?? task.planned ?? "";
  state.taskScope = "current";
  restoreStrategyConditionState(task.strategyCondition || task);
  if (task.sourceVersions?.length) {
    state.selectedVersions = [...task.sourceVersions];
  }
  if (!task.syncRegions?.length && task.region) {
    state.selectedRegions = task.region.split("、").filter(Boolean);
  }
  sanitizeRegionState();
}

function draftTaskAsRow() {
  const draft = state.draftTask;
  const packageLabel = draft.packageType === "whole" ? "整包" : "差分包";
  const regions = draft.strategy === "version"
    ? dispatchRegionSummary(draft.dispatchRegions || draft.dispatchRegion || "中国")
    : "按设备所属大区自动分发";
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
    dispatchRegion: draft.strategy === "version" ? regions : "",
    dispatchRegions: draft.strategy === "version" ? normalizeDispatchRegions(draft.dispatchRegions || draft.dispatchRegion || []) : [],
    syncRegions: null,
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
    <tr data-task-row="${task.id}">
      <td title="${task.name}">
        <div class="task-name-cell">
          <strong>${task.name}</strong>
          ${task.isLocal ? `<span class="mini-tag green">新发布</span>` : ""}
        </div>
      </td>
      ${renderTaskDataCells(task)}
      <td>${renderTaskStatus(task.status)}</td>
      <td class="sticky-action-col">${renderTaskActions(task.status, task.id)}</td>
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
    creator: `<td>${task.creator}</td>`,
    createdAt: `<td>${task.createdAt}</td>`,
  };
  return taskColumnOptions.map(([key]) => state.visibleTaskColumns[key] ? cellMap[key] : "").join("");
}

function renderTaskScale(task) {
  if (task.method === "指定版本") {
    if (task.quantityMode === "batch") {
      const maxTotal = plannedBatchTotal(task);
      const text = maxTotal ? Number(maxTotal).toLocaleString() : "不限制";
      return `<button class="link-btn task-scale-link" type="button" data-route="task-detail" data-task-id="${task.id}">${text}</button>`;
    }
    return `<button class="link-btn task-scale-link" type="button" data-route="task-detail" data-task-id="${task.id}">全量</button>`;
  }

  if (!task.total || task.total === "-") return "-";
  return `<button class="link-btn task-scale-link" type="button" data-route="task-detail" data-task-id="${task.id}">${Number(task.total).toLocaleString()}</button>`;
}

function renderTaskResult(task) {
  const result = task.result;
  if (!result) return "-";
  if (task.method === "指定版本") {
    if (task.quantityMode === "batch") {
      const planned = plannedBatchTotal(task);
      const matched = Number(result.matched || 0);
      return `
        <div class="result-stack">
          <span class="success">已匹配 ${matched.toLocaleString()}${planned ? ` / 最大 ${planned.toLocaleString()}` : " / 最大 不限制"}</span>
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

function renderTaskActions(status, taskId = "") {
  const actions = taskStatusMeta[status]?.actions || ["detail"];
  const taskAttr = taskId ? ` data-task-id="${taskId}"` : "";
  const actionMap = {
    detail: `<button class="link-btn" type="button" data-route="task-detail"${taskAttr}>详情</button>`,
    end: `<button class="link-btn danger" type="button" data-action="end-task"${taskAttr}>结束任务</button>`,
    copyRebuild: `<button class="link-btn" type="button" data-action="copy-rebuild-task"${taskAttr}>复制重建</button>`,
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
      <td class="sticky-action-col">${renderTaskActions("待发布", draftRow.id)}</td>
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
    "待升级": "gray",
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
          "流程调整为基本任务、策略配置、预览发布。",
          "基本任务只录入公共信息，不展示任何大区选择。",
          "策略配置中选择升级方式；仅指定版本需要选择指定分发范围。",
          "预览发布用于确认预检结果、异常明细、审批或发布动作。",
          "下一步前需完成当前步骤字段校验；返回上一步需保留已填写内容和策略选择。",
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
          "发布后需记录提交时间、创建人、任务状态、策略条件、源版本或设备来源，并生成首条流转记录。",
        ])}
      </div>
    </section>
  `;
}

function renderCreateSteps() {
  const steps = [
    ["基本任务", "填写公共信息"],
    ["策略配置", "选择方式并配置策略"],
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
  if (state.createStep === 1) return renderBasicInfoStep();
  if (state.createStep === 2) return renderStrategyConfigStep();
  if (state.createStep === 3) return renderPreviewStep();
  return renderBasicInfoStep();
}

function renderStrategySelectionStep() {
  return `
    <section class="workbench-card step-card strategy-selection-card">
      <div class="card-heading">
        <div>
          <h3>选择升级方式</h3>
        </div>
      </div>
      ${renderRequirementNote("PRD 03", "升级方式前置", [
        "在策略配置步骤选择指定版本、文件导入或手动导入。",
        "指定版本需要选择指定分发范围；文件/手动创建时无需选择大区。",
        "指定版本/文件导入需审批，手动导入无需审批。",
        "切换升级方式时仅保留任务名称、目标版本、任务时间、升级说明等公共字段，策略私有字段需重新配置。",
      ])}
      <div class="strategy-grid strategy-entry-grid">
        ${strategyCard("version", "指定版本号升级", "按指定分发范围和源版本动态匹配设备。", ["多选范围", "审批发布", "动态匹配"])}
        ${strategyCard("file", "文件导入升级", "上传设备清单后按设备所属大区自动分发。", ["自动分发", "审批发布", "固定清单"])}
        ${strategyCard("manual", "手动导入升级", "录入少量设备并按设备所属大区自动分发。", ["自动分发", "直接发布", "小批量"])}
      </div>
    </section>
  `;
}

function renderTaskContentStep() {
  return `
    ${renderStrategySelectionStep()}
    ${renderBasicInfoStep()}
    ${renderStrategyStep()}
  `;
}

function renderStrategyConfigStep() {
  return `
    ${renderStrategySelectionStep()}
    ${renderStrategyStep()}
  `;
}

function renderBasicInfoStep() {
  return `
    <section class="workbench-card step-card">
      <div class="card-heading">
        <div>
          <h3>基础信息</h3>
        </div>
      </div>
      ${renderRequirementNote("PRD 03", "基础信息必填规则", [
        "任务名称、目标固件版本、任务起止时间、任务升级说明均为必填。",
        "基本任务步骤不展示大区选择；指定版本的大区选择在策略配置步骤完成。",
        "过去日期不可选；默认开始时间为当前时间后 5 分钟。",
        "基础信息入库字段包含 taskName、targetVersion、taskStartAt、taskEndAt、description。",
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
  return state.strategy === "version"
    ? renderVersionDispatchRegionPicker()
    : `<div class="readonly-region-card"><strong>自动分发</strong><span>${strategyMeta[state.strategy].short}按设备所属大区分发</span></div>`;
}

function renderCurrentRegionScopePicker() {
  return renderVersionDispatchRegionPicker();
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
        <span>${isCondition ? "设备所属大区条件" : "指定分发范围"}</span>
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
          <h3>升级配置</h3>
        </div>
      </div>
      ${renderRequirementNote("PRD 06 / 07 / 08", "策略配置规则", [
        "升级方式支持指定版本、文件导入、手动导入。",
        "指定版本不再拆分三个规则切换，统一通过源版本表格勾选。",
        "全量展示全量；批量支持单批下发数量和任务最大下发数量。",
        "策略字段需记录 dispatchRegions、sourceVersions、quantityMode、batchLimit、maxDispatchTotal 或导入/手动设备校验结果。",
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
          <h3>预览发布</h3>
        </div>
        ${state.strategy === "version" ? `<span class="soft-pill blue-pill">动态匹配预览</span>` : renderPreviewScenarioSwitch()}
      </div>
      ${renderRequirementNote("PRD 03 / 15", "预览发布场景", [
        "需支持部分可升级、无可升级、全部可升级三种场景模拟。",
        "无可升级时不允许发布；指定版本和文件导入方式发布需进入审批流程。",
        "异常场景支持下载异常明细。",
        "预检结果需记录参与预检数、可升级数、异常数、异常类型和是否允许发布。",
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
    return `${dispatchQuantitySummary()}，执行期动态匹配`;
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
        ? `<button class="btn primary" type="button" data-action="next-create-step">${state.createStep === 1 ? "下一步：策略配置" : "下一步：预览发布"}</button>`
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
      </div>
      <span class="soft-pill blue-pill">已选择 ${state.selectedVersions.length} 个源版本</span>
    </div>
    <div class="rule-panel">
      ${renderFieldError("strategy")}
      ${renderVersionDispatchRegionPicker()}
      <div class="quantity-panel">
        <span class="field-caption">配置升级数量</span>
        <div class="segmented compact-segmented" role="radiogroup" aria-label="升级数量">
          ${radio("quantityMode", "full", "全量", state.quantityMode)}
          ${radio("quantityMode", "batch", "批量", state.quantityMode)}
        </div>
        ${state.quantityMode === "batch"
          ? `
            <label class="quantity-input"><span>单批下发数量</span><input class="table-input" type="number" min="0" value="${state.batchLimit}" aria-label="单批下发数量" data-batch-limit /><em>台</em></label>
            <label class="quantity-input max-total-input"><span>任务最大下发数量</span><input class="table-input" type="number" min="0" value="${state.maxDispatchTotal}" placeholder="不限制" aria-label="任务最大下发数量" data-max-dispatch-total /><em>台</em></label>
          `
          : ""}
        <span class="quantity-copy">${state.quantityMode === "full" ? "按所选分发范围动态匹配全部可升级设备" : "单批控制每轮节奏；最大下发数量为空表示不限制，达到后停止匹配新设备"}</span>
      </div>
      ${renderFieldError("batchLimit")}
      ${renderFieldError("maxDispatchTotal")}
      ${renderStrategyConditions()}
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
    </div>
  `;
}

function renderVersionDispatchRegionPicker() {
  const selected = normalizeDispatchRegions(state.dispatchRegions);
  const selectedSet = new Set(selected);
  const chinaChildSelectedCount = chinaDispatchChildren.filter(region => selectedSet.has(region)).length;
  const chinaAllSelected = selectedSet.has("中国") || chinaChildSelectedCount === chinaDispatchChildren.length;
  const chinaPartial = !selectedSet.has("中国") && chinaChildSelectedCount > 0 && chinaChildSelectedCount < chinaDispatchChildren.length;
  return `
    <section class="sync-region-panel dispatch-region-panel">
      <div class="sync-region-head">
        <span><span class="required">*</span> 指定分发范围</span>
        <em>已选择 ${selected.length} 个范围</em>
      </div>
      <div class="dispatch-region-picker">
        <div class="dispatch-parent-row">
          ${dispatchRegionGroups.map(group => renderDispatchParentOption(group, selectedSet)).join("")}
        </div>
        <div class="dispatch-detail-row">
          <div class="dispatch-child-panel ${chinaAllSelected || chinaPartial ? "active" : ""}">
            <div class="dispatch-child-head">
              <strong>中国子节点</strong>
              <span>${chinaAllSelected ? "已覆盖全部子节点" : chinaPartial ? `已选择 ${chinaChildSelectedCount} 个子节点` : "可按子节点精细下发"}</span>
            </div>
            <div class="dispatch-child-grid">
              ${chinaDispatchChildren.map(child => `
                <label class="dispatch-region-child ${selectedSet.has(child) || selectedSet.has("中国") ? "checked" : ""}" data-action="toggle-dispatch-region" data-region="${child}">
                  <input type="checkbox" ${selectedSet.has(child) || selectedSet.has("中国") ? "checked" : ""} />
                  <span>${child.replace("中国 / ", "")}</span>
                </label>
              `).join("")}
            </div>
          </div>
          <div class="dispatch-selected-panel">
            <span>已选范围</span>
            <div class="dispatch-region-summary">${renderDispatchRegionTags(selected)}</div>
          </div>
        </div>
      </div>
      ${renderFieldError("dispatchRegions")}
    </section>
  `;
}

function renderDispatchParentOption(group, selectedSet) {
  const hasChildren = group.children.length > 0;
  const childSelectedCount = group.children.filter(region => selectedSet.has(region)).length;
  const parentChecked = selectedSet.has(group.label) || (hasChildren && childSelectedCount === group.children.length);
  const partial = hasChildren && !selectedSet.has(group.label) && childSelectedCount > 0 && childSelectedCount < group.children.length;
  const stateText = hasChildren
    ? parentChecked ? "全部子节点" : partial ? `${childSelectedCount} 个子节点` : group.desc
    : group.desc;
  return `
    <label class="dispatch-parent-option ${parentChecked || partial ? "checked" : ""} ${partial ? "partial" : ""}" data-action="toggle-dispatch-region" data-region="${group.label}">
      <input type="checkbox" ${parentChecked ? "checked" : ""} ${partial ? "data-partial='true'" : ""} />
      <span>${group.label}</span>
      <em>${stateText}</em>
    </label>
  `;
}

function scopeRadio(value, title) {
  return `
    <label class="scope-option ${state.taskScope === value ? "active" : ""}">
      <input type="radio" name="taskScope" value="${value}" ${state.taskScope === value ? "checked" : ""} data-radio="taskScope" />
      <strong>${title}</strong>
    </label>
  `;
}

function renderSyncRegionPicker() {
  return renderVersionDispatchRegionPicker();
}

function renderFileStrategy(packageLabel) {
  return `
    <div class="config-panel-heading">
      <div>
        <strong>文件导入升级配置</strong>
      </div>
      <span class="soft-pill blue-pill">按设备所属大区自动分发</span>
      <div class="template-actions">
        <button class="btn" type="button" data-action="download-template">下载 CSV 模板</button>
        <button class="btn" type="button" data-action="download-template">下载 Excel 模板</button>
      </div>
    </div>
    <div class="import-panel">
      ${renderUploadState()}
    </div>
    ${renderStrategyConditions()}
    ${renderFieldError("fileUpload")}
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
        <p>共 <b>${state.uploadDeviceCount}</b> 台设备，文件已就绪；发布后系统将按设备所属大区自动分发。</p>
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
          <p>输入设备 ID 后自动校验源版本与所属大区；发布后按设备所属大区自动分发。</p>
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
    ${renderStrategyConditions()}
    ${renderFieldError("manualDevices")}
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
    const deviceCount = state.quantityMode === "batch" ? `单批 ${Number(state.batchLimit || 0).toLocaleString()} 台` : "全量";
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
  const rows = normalizeStrategyConditionRows(state.strategyConditions);
  return `
    <section class="strategy-condition-card ${state.strategyConditionEnabled ? "active" : ""}">
      <div class="strategy-condition-head">
        <label class="switch-line">
          <input type="checkbox" ${state.strategyConditionEnabled ? "checked" : ""} data-action="toggle-strategy-condition" />
          <span>策略条件</span>
        </label>
        ${state.strategyConditionEnabled ? `<button class="link-btn condition-add-btn" type="button" data-action="add-strategy-condition">${icon("plus")}添加条件</button>` : ""}
      </div>
      ${state.strategyConditionEnabled ? `
        <div class="strategy-condition-table">
          <div class="strategy-condition-table-head">
            <span>条件项</span>
            <span>操作符</span>
            <span>条件值</span>
            <span>操作</span>
          </div>
          ${rows.map(row => `
            <div class="strategy-condition-row">
              <select data-strategy-condition-field data-condition-id="${row.id}" aria-label="策略条件项">
                ${strategyConditionFields.map(field => `<option value="${field}" ${row.field === field ? "selected" : ""}>${field}</option>`).join("")}
              </select>
              <select data-strategy-condition-operator data-condition-id="${row.id}" aria-label="策略条件操作符">
                ${strategyConditionOperators.map(operator => `<option value="${operator}" ${row.operator === operator ? "selected" : ""}>${operator}</option>`).join("")}
              </select>
              <input class="input" value="${escapeHtml(row.values)}" placeholder="输入条件值，多个值用顿号或逗号分隔" data-strategy-condition-values data-condition-id="${row.id}" aria-label="策略条件值" />
              <button class="icon-tool-btn condition-remove-btn" type="button" data-action="remove-strategy-condition" data-condition-id="${row.id}" aria-label="删除策略条件" ${rows.length <= 1 ? "disabled" : ""}>${icon("close")}</button>
            </div>
          `).join("")}
        </div>
      ` : ""}
    </section>
  `;
}

function renderStrategyNote(packageLabel) {
  const meta = strategyMeta[state.strategy];
  const note = {
    version: "按源版本和指定分发范围动态匹配设备。",
    file: "设备清单导入后展示可升级设备与异常明细。",
    manual: "少量设备即时校验后进入发布确认。",
  }[state.strategy];
  return `
    <div class="strategy-note">
      ${icon(state.strategy === "manual" ? "check" : "info")}
      <div>
        <strong>${meta.title}</strong>
        <p>当前使用${packageLabel}，${note}</p>
      </div>
    </div>
  `;
}

function renderTaskDetail() {
  normalizeDetailStatusForMode();
  const selectedTask = findTaskById(state.selectedTaskId);
  const detail = taskDetailData(state.detailStatus, selectedTask);
  return `
    <section class="page">
      ${renderPageHeader("任务详情", {
        back: "task-list",
      })}
      ${renderDetailStatusSwitch()}
      <div class="annotated-block">
        ${renderDetailHero(detail)}
        ${renderRequirementNote("PRD 12", "顶部任务概览卡", [
          "顶部卡片关注任务本身，状态标签放在任务名称旁边。",
          "展示任务标识、创建人、更新时间、任务说明、目标版本、任务时间、升级方式、升级包和分发口径。",
          "不展示重复执行概览，不放查看升级明细按钮，避免与页签导航重复。",
          "发布、审批、执行信息由顶部状态、任务进度和流转明细承接。",
        ])}
      </div>
      <div class="annotated-block compact-note-block">
        ${renderDetailTabs()}
        ${renderRequirementNote("PRD 12", "详情页信息架构", [
          "主页签固定为任务概览和升级明细。",
          "任务概览展示任务配置和流转；升级明细先展示分区升级明细，再展示当前分区的升级概览、异常分类和设备列表。",
          "开发评审视图可切换状态和统计口径，但不影响真实任务记录字段。",
        ])}
      </div>
      ${renderDetailTabContent(detail)}
    </section>
  `;
}

function renderDetailHeaderActions(detail) {
  const taskAttr = detail.taskId ? ` data-task-id="${detail.taskId}"` : "";
  const actions = [];
  if (detail.status === "升级中") {
    actions.push(`<button class="btn danger" type="button" data-action="end-task"${taskAttr}>结束任务</button>`);
  }
  if (["已完成", "已结束", "已驳回", "已失效"].includes(detail.status)) {
    actions.push(`<button class="btn primary" type="button" data-action="copy-rebuild-task"${taskAttr}>${icon("copy")}复制重建</button>`);
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
    if (!isExecutionStatus) return renderUpgradeDetailEmptyState(detail);
    const regionPanel = detail.method === "指定版本"
      ? renderDispatchRegionExecutionPanel(detail)
      : isFixedDeviceDetailMode()
        ? renderDeviceRegionDistribution(detail)
        : "";
    const exceptionSummary = renderExceptionSummary(detail);
    return `
        ${regionPanel ? `<div class="annotated-block">${regionPanel}</div>` : ""}
        <div class="annotated-block">
          ${renderUpgradeDetailOverview(detail)}
          ${renderRequirementNote("PRD 12", "升级概览统计口径", [
            "文件/手动导入展示固定设备总数、已处理、成功、失败、未处理。",
            "指定版本全量展示已匹配数、成功数、失败数、升级中，不展示未知总数百分比。",
            "指定版本批量展示单批下发数量、任务最大下发数量、已匹配数、成功数、失败数和升级中。",
            "统计记录需区分 matchedCount、batchLimit、maxDispatchTotal、successCount、failedCount、runningCount、pendingCount。",
          ])}
        </div>
        ${exceptionSummary ? `<div class="annotated-block">
          ${exceptionSummary}
          ${renderRequirementNote("PRD 12", "异常分类", [
            "仅执行态且存在失败设备时展示。",
            "使用 6 个一级异常分类和 ECharts 基础环形图。",
            "图表与分类列表支持鼠标悬停联动，并提供下载异常明细入口。",
            "异常明细需记录 deviceId、exceptionType、exceptionReason、currentVersion、deviceRegion。",
          ])}
        </div>` : ""}
        <div class="annotated-block">
          ${renderDeviceDetailTable(detail)}
          ${renderRequirementNote("PRD 12", "设备列表", [
            "非执行态展示空状态，不展示设备表格。",
            "执行态展示进入下发链路的设备；指定版本全量仅展示已动态匹配设备。",
            "设备标识搜索与导出设备列表按钮需位于同一工具栏。",
            "导出需遵循当前设备搜索条件，设备行至少包含设备 ID、源版本、目标版本、所属大区、升级结果和失败原因。",
          ])}
        </div>
      `
  }
  return `
    <div class="annotated-block">
      ${renderTaskFlowOverview(detail)}
      ${renderRequirementNote("PRD 12 / 09", "任务进度与流转明细", [
        "任务进度只表达流程阶段和关键节点时间，不展示设备执行百分比或重复状态摘要。",
        "流转明细完整展示创建、提交/发布、审批、下发、完成或结束节点。",
        "每条流转记录需包含节点名称、操作人、操作时间、节点结果和说明。",
        "已完成包含成功和失败设备；已结束表示用户提前手动结束，需记录结束时间和结束原因。",
      ])}
    </div>
  `;
}

function renderUpgradeDetailEmptyState(detail) {
  const map = {
    "待审批": "任务仍在审批中，尚未进入执行阶段，暂无升级明细。",
    "已驳回": `审批已驳回，任务未生效，不会生成升级明细。${detail.rejectReason ? `驳回原因：${detail.rejectReason}` : ""}`,
    "已失效": `任务已失效，未进入下发链路，不会生成升级明细。${detail.invalidReason ? `失效原因：${detail.invalidReason}` : ""}`,
    "待执行": `任务已进入执行队列，计划 ${detail.startAt} 开始下发，当前暂无升级明细。`,
  };
  return `<div class="empty-state-panel">${icon("info")} ${map[detail.status] || "任务尚未进入执行阶段，暂无升级明细。"}</div>`;
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

function taskDetailData(status, task = null) {
  const modeConfig = detailModeConfig();
  const useTaskConfig = shouldUseTaskConfigForCurrentDetail(task);
  const dispatchRegions = useTaskConfig && taskDispatchRegions(task).length
    ? taskDispatchRegions(task)
    : normalizeDispatchRegions(modeConfig.dispatchRegions || modeConfig.dispatchRegion || ["中国"]);
  const base = {
    taskId: task?.id || "OTA-20260610-0008",
    name: task?.name || "IPC-杭州低功耗_安全补丁升级",
    status,
    creator: task?.creator || "汤彦珊",
    approver: "钱江涛",
    createdAt: task?.createdAt || "2026-06-03 16:40:12",
    updatedAt: task?.updatedAt || task?.createdAt || "2026-06-10 09:18:32",
    submittedAt: task?.submittedAt || task?.createdAt || "2026-06-03 17:20:18",
    approvedAt: "2026-06-03 18:10:42",
    startAt: taskStartFromRow(task) || "2026-06-10 09:00:00",
    endAt: taskEndFromRow(task) || "2026-06-17 09:00:00",
    targetVersion: task?.targetVersion || "23.422.209.17",
    method: useTaskConfig ? task.method : modeConfig.method,
    packageType: useTaskConfig ? task.packageType : modeConfig.packageType,
    total: useTaskConfig && task?.total ? Number(task.total) : (Number(modeConfig.total) || 6505),
    region: useTaskConfig ? displayTaskRegion(task) : (modeConfig.region || "中国 / 杭州低功耗"),
    desc: useTaskConfig && task?.desc ? task.desc : modeConfig.desc,
    sourceScope: useTaskConfig && task?.sourceScope ? task.sourceScope : modeConfig.sourceScope,
    sourceVersions: useTaskConfig && task?.sourceVersions?.length ? task.sourceVersions : (modeConfig.sourceVersions || []),
    condition: useTaskConfig && task?.condition ? task.condition : modeConfig.condition,
    strategyCondition: useTaskConfig && task?.strategyCondition ? task.strategyCondition : { enabled: false, text: "未配置" },
    dispatchRegion: dispatchRegionSummary(dispatchRegions),
    dispatchRegions,
    batchLimit: useTaskConfig ? task?.batchLimit ?? null : modeConfig.batchLimit ?? null,
    maxDispatchTotal: useTaskConfig ? task?.maxDispatchTotal ?? task?.planned ?? "" : modeConfig.maxDispatchTotal ?? "",
    syncBatchId: "",
    syncRegions: [],
  };
  const variants = {
    "待审批": { success: 0, failed: 0, running: 0, pending: 6505 },
    "已驳回": { success: 0, failed: 0, running: 0, pending: 6505, rejectReason: "目标版本与升级策略不一致" },
    "已失效": { success: 0, failed: 0, running: 0, pending: 6505, invalidReason: "审批超时，任务开始时间已过" },
    "待执行": { success: 0, failed: 0, running: 0, pending: 6505 },
    "升级中": { success: 346, failed: 12, running: 3838, pending: 2309 },
    "已完成": { success: 6488, failed: 17, running: 0, pending: 0 },
    "已结束": { success: 730, failed: 8, running: 0, pending: 5767, endedAt: "2026-06-11 15:20:10", endReason: "发现部分设备升级失败率异常，提前停止继续下发" },
  };
  const statusVariant = variants[status] || variants["升级中"];
  const taskMetrics = useTaskConfig ? detailMetricsFromTaskStatus(status, task, base) : null;
  return taskMetrics
    ? { ...base, ...statusVariant, ...taskMetrics }
    : normalizeDetailMetrics({ ...base, ...statusVariant });
}

function shouldUseTaskConfigForCurrentDetail(task) {
  return Boolean(task && detailMetricModeForTask(task) === state.detailMetricMode);
}

function detailMetricsFromTaskStatus(status, task, base) {
  const result = task?.result || {};
  const resultSuccess = Number(result.success || 0);
  const resultFailed = Number(result.failed || 0);
  const resultMatched = Number(result.matched || 0);
  const resultTotal = Number(result.total || 0);
  const isVersionTask = task.method === "指定版本";
  const knownProcessed = Math.max(resultMatched, resultSuccess + resultFailed);

  if (!["升级中", "已完成", "已结束"].includes(status)) {
    if (isVersionTask && task.quantityMode !== "batch") {
      return { success: 0, failed: 0, running: 0, pending: 0 };
    }
    const pendingTarget = isVersionTask
      ? plannedBatchTotal(task)
      : Number(task.total || resultTotal || base.total || 0);
    return { success: 0, failed: 0, running: 0, pending: Math.max(pendingTarget, 0) };
  }

  return isVersionTask
    ? versionTaskMetricsFromResult(status, task, base, knownProcessed, resultSuccess, resultFailed)
    : fixedTaskMetricsFromResult(status, task, base, resultTotal, resultSuccess, resultFailed);
}

function versionTaskMetricsFromResult(status, task, base, knownProcessed, resultSuccess, resultFailed) {
  const isBatch = task.quantityMode === "batch";
  const plan = isBatch ? plannedBatchTotal(task) : 0;
  const fallbackMatched = isBatch
    ? (status === "已完成" ? (plan || Number(base.total) || 5000) : Math.min(plan || 730, status === "已结束" ? 730 : 3600))
    : (status === "已完成" ? Number(base.total || 6505) : status === "已结束" ? 738 : 4196);
  const matched = Math.max(knownProcessed || fallbackMatched, 0);

  if (status === "升级中") {
    const failed = knownProcessed ? resultFailed : Math.min(Math.max(Math.round(matched * 0.012), 1), matched);
    const running = knownProcessed
      ? Math.max(matched - resultSuccess - failed, 0)
      : Math.min(Math.max(Math.round(matched * 0.18), 1), Math.max(matched - failed, 0));
    const success = knownProcessed ? resultSuccess : Math.max(matched - failed - running, 0);
    return {
      success,
      failed,
      running,
      pending: isBatch && plan ? Math.max(plan - matched, 0) : 0,
    };
  }

  const failed = knownProcessed ? resultFailed : (status === "已结束" ? Math.min(8, matched) : Math.min(17, matched));
  const success = knownProcessed && resultSuccess
    ? resultSuccess
    : Math.max(matched - failed, 0);
  return {
    success,
    failed,
    running: 0,
    pending: isBatch && status === "已结束" && plan ? Math.max(plan - matched, 0) : 0,
  };
}

function fixedTaskMetricsFromResult(status, task, base, resultTotal, resultSuccess, resultFailed) {
  const total = Math.max(Number(task.total || 0), Number(base.total || 0), resultTotal, resultSuccess + resultFailed);
  if (!total) return { success: 0, failed: 0, running: 0, pending: 0 };

  if (status === "升级中") {
    if (resultTotal || resultSuccess || resultFailed) {
      const running = Math.max(total - resultSuccess - resultFailed, 0);
      return { success: resultSuccess, failed: resultFailed, running, pending: 0 };
    }
    const failed = Math.min(Math.round(total * 0.02), total);
    const running = Math.min(Math.max(Math.round(total * 0.28), total > failed ? 1 : 0), Math.max(total - failed, 0));
    const success = Math.max(Math.round(total * 0.52), 0);
    const pending = Math.max(total - success - failed - running, 0);
    return { success, failed, running, pending };
  }

  if (status === "已完成") {
    const failed = resultFailed;
    const success = resultSuccess + failed >= total ? resultSuccess : Math.max(total - failed, 0);
    return { success, failed, running: 0, pending: 0 };
  }

  const failed = resultFailed || (total > 1 ? 1 : 0);
  const success = resultSuccess || Math.max(Math.round(total * 0.62), 0);
  return {
    success,
    failed,
    running: 0,
    pending: Math.max(total - success - failed, 0),
  };
}

function taskStartFromRow(task) {
  if (!task?.time) return "";
  return task.time.split("~")[0] || "";
}

function taskEndFromRow(task) {
  if (!task?.time) return "";
  return task.time.split("~")[1] || "";
}

function detailModeConfig() {
  const common = {
    packageType: "整包",
    desc: "修复低功耗设备夜间唤醒异常，按策略规则灰度发布。",
    condition: "按设备所属大区自动分发",
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
      dispatchRegion: "中国",
      dispatchRegions: ["中国 / 杭州低功耗", "香港"],
      batchLimit: 500,
      maxDispatchTotal: 5000,
    },
    versionFull: {
      ...common,
      method: "指定版本",
      total: 6505,
      sourceScope: "23.422.208.91、23.110.105.46、23.110.105.43、10.176.42",
      sourceVersions: ["23.422.208.91", "23.110.105.46", "23.110.105.43", "10.176.42"],
      dispatchRegion: "中国",
      dispatchRegions: ["中国 / 杭州低功耗", "香港"],
    },
  };
  return configs[state.detailMetricMode] || configs.versionFull;
}

function normalizeDetailMetrics(detail) {
  if (isManualDetailMode()) {
    const total = Math.max(Number(detail.total) || 0, 1);
    const manualMetrics = {
      "待执行": { success: 0, failed: 0, running: 0, pending: total },
      "升级中": { success: Math.max(total - 1, 1), failed: 0, running: total > 1 ? 1 : 0, pending: 0 },
      "已完成": { success: total, failed: 0, running: 0, pending: 0 },
      "已结束": { success: Math.max(total - 1, 0), failed: 0, running: 0, pending: total > 1 ? 1 : 0 },
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
  const selectedTask = findTaskById(state.selectedTaskId);
  const metricModes = [
    ["file", "文件导入"],
    ["manual", "手动导入"],
    ["versionFull", "指定版本全量"],
    ["versionBatch", "指定版本批量"],
  ];
  return `
    <div class="detail-status-switch">
      <div class="simulation-head">
        <strong>${selectedTask ? "状态评审视图" : "开发评审视图"}</strong>
        <span>${selectedTask ? "默认带入当前任务口径，可快速切换其他策略口径查阅，不改真实任务配置。" : "用于切换状态和统计口径，不影响真实任务配置。"}</span>
      </div>
      <div class="simulation-row">
        <span>状态模拟</span>
        <div>
          ${statuses.map(status => `<button class="${state.detailStatus === status ? "active" : ""}" type="button" data-action="set-detail-status" data-status="${status}">${status}</button>`).join("")}
        </div>
      </div>
      <div class="simulation-row">
        <span>${selectedTask ? "当前口径" : "统计口径"}</span>
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
          <p>任务 ID：${detail.taskId}${detail.syncBatchId ? ` · 同步批次：${detail.syncBatchId}` : ""} · 创建人：${detail.creator} · 更新时间：${detail.updatedAt}</p>
          <p class="task-title-desc">${detail.desc}</p>
        </div>
        ${actions ? `<div class="task-overview-actions">${actions}</div>` : ""}
      </div>
      <section class="task-kpi-grid">
        ${renderTaskKpi("目标版本", detail.targetVersion, "blue")}
        ${renderTaskKpi("任务时间", `${detail.startAt}<br />至 ${detail.endAt}`)}
        ${renderTaskKpi(detail.method === "指定版本" ? "指定分发范围" : "分发方式", detail.method === "指定版本" ? dispatchRegionSummary(detail.dispatchRegions) : "自动按设备大区")}
        ${renderTaskKpi("升级设备数", overviewDeviceScale(detail))}
      </section>
      <section class="task-overview-middle">
        ${renderTaskStrategyPanel(detail)}
        ${renderTaskConditionPanel(detail)}
      </section>
    </div>
  `;
}

function renderSyncTaskNotice(detail) {
  return "";
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

function renderDispatchRegionExecutionPanel(detail) {
  const rows = dispatchRegionExecutionRows(detail);
  const activeKey = selectedDetailRegionKey(detail);
  const activeRow = rows.find(row => regionTabKey(row.region) === activeKey) || rows[0];
  return `
    <section class="region-detail-panel">
      <div class="region-detail-head">
        <div>
          <h3 class="section-title">${icon("map")}分区升级明细</h3>
          <p>${isVersionBatchDetailMode() ? `单批 ${Number(batchLimitForTask()).toLocaleString()} 台 · 最大下发 ${plannedBatchTotal() ? `${Number(plannedBatchTotal()).toLocaleString()} 台` : "不限制"}` : "按分发范围独立查看升级结果"}</p>
        </div>
        <span>${rows.length} 个分发范围</span>
      </div>
      <div class="region-tab-strip" role="tablist" aria-label="分发范围">
        ${rows.map(row => `
          <button class="${regionTabKey(row.region) === activeKey ? "active" : ""}" type="button" role="tab" aria-selected="${regionTabKey(row.region) === activeKey}" data-action="set-detail-region-tab" data-region-tab="${escapeHtml(regionTabKey(row.region))}">
            <strong>${escapeHtml(compactRegionName(row.region))}</strong>
            <span>${Number(row.matched).toLocaleString()} 台</span>
          </button>
        `).join("")}
      </div>
      <div class="region-execution-summary">
        <div class="region-summary-title">
          <strong>${escapeHtml(activeRow.region)}</strong>
          ${statusTag(activeRow.status)}
        </div>
        <div class="region-summary-metrics">
          ${renderRegionSummaryMetric("已匹配", activeRow.matched)}
          ${renderRegionSummaryMetric("已下发", activeRow.dispatched)}
          ${renderRegionSummaryMetric("成功", activeRow.success, "success")}
          ${renderRegionSummaryMetric("失败", activeRow.failed, "failed")}
          ${renderRegionSummaryMetric("升级中", activeRow.running)}
          <dl><dt>成功率</dt><dd>${activeRow.successRate}%</dd></dl>
        </div>
        <p>最近更新：${activeRow.updatedAt}</p>
      </div>
    </section>
  `;
}

function renderRegionSummaryMetric(label, value, tone = "") {
  return `<dl><dt>${label}</dt><dd class="${tone}">${Number(value).toLocaleString()} 台</dd></dl>`;
}

function regionTabKey(region) {
  return String(region || "").replace(/\s+/g, "");
}

function compactRegionName(region) {
  return String(region || "").replace(/^中国\s*\/\s*/, "");
}

function selectedDetailRegionKey(detail) {
  const rows = detail.method === "指定版本" ? dispatchRegionExecutionRows(detail) : [];
  const keys = rows.map(row => regionTabKey(row.region));
  return keys.includes(state.detailRegionTab) ? state.detailRegionTab : (keys[0] || "");
}

function selectedDetailRegionName(detail) {
  const key = selectedDetailRegionKey(detail);
  return dispatchRegionExecutionRows(detail).find(row => regionTabKey(row.region) === key)?.region || "";
}

function dispatchRegionExecutionRows(detail) {
  const regions = expandedDispatchRegions(detail.dispatchRegions?.length ? detail.dispatchRegions : ["中国"]);
  const weights = regions.map((_, index) => index + 2);
  const successCounts = splitCountByWeights(Number(detail.success) || 0, weights);
  const failedCounts = splitCountByWeights(Number(detail.failed) || 0, weights);
  const runningCounts = splitCountByWeights(Number(detail.running) || 0, weights);
  return regions.map((region, index) => {
    const success = successCounts[index] || 0;
    const failed = failedCounts[index] || 0;
    const running = runningCounts[index] || 0;
    const matched = success + failed + running;
    const dispatched = success + failed + running;
    const successRate = dispatched ? ((success / dispatched) * 100).toFixed(1) : "0.0";
    const rowStatus = detail.status === "升级中"
      ? "升级中"
      : detail.status === "已结束"
        ? "已结束"
        : detail.status === "已完成"
          ? "已完成"
          : "待执行";
    return {
      region,
      status: rowStatus,
      matched,
      dispatched,
      success,
      failed,
      running,
      successRate,
      updatedAt: detail.status === "待执行" ? "-" : "2026-06-10 11:35:22",
    };
  });
}

function renderDeviceRegionDistribution(detail) {
  const total = Math.max(Number(detail.total) || 0, 1);
  const names = ["中国", "香港", "法兰福克", "硅谷"];
  const weights = [52, 18, 17, 13];
  const stats = metricStats(detail);
  const counts = splitCountByWeights(total, weights);
  const successCounts = splitCountByWeights(stats.upgradeSuccess, weights);
  const failedCounts = splitCountByWeights(stats.upgradeFailed, weights);
  const runningCounts = splitCountByWeights(stats.running, weights);
  const rows = names.map((name, index) => {
    const count = counts[index];
    const success = Math.min(successCounts[index], count);
    const failed = Math.min(failedCounts[index], Math.max(count - success, 0));
    const running = Math.min(runningCounts[index], Math.max(count - success - failed, 0));
    const pending = Math.max(count - success - failed - running, 0);
    return { name, count, success, failed, running, pending };
  }).filter(row => row.count > 0);
  return `
    <section class="china-node-panel">
      <div class="task-panel-title">
        <h3>设备所属大区分布</h3>
        <span>按设备归属统计</span>
      </div>
      <div class="china-node-grid">
        ${rows.map(row => `
          <article>
            <strong>${row.name}</strong>
            <dl>
              <dt>设备数</dt><dd>${Number(row.count).toLocaleString()} 台</dd>
              <dt>成功</dt><dd class="success">${Number(row.success).toLocaleString()} 台</dd>
              <dt>失败</dt><dd class="failed">${Number(row.failed).toLocaleString()} 台</dd>
              ${row.running ? `<dt>升级中</dt><dd>${Number(row.running).toLocaleString()} 台</dd>` : ""}
              ${row.pending ? `<dt>未处理</dt><dd>${Number(row.pending).toLocaleString()} 台</dd>` : ""}
            </dl>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function splitCountByWeights(total, weights) {
  const value = Math.max(Math.round(Number(total) || 0), 0);
  const weightTotal = weights.reduce((sum, item) => sum + item, 0) || 1;
  let remaining = value;
  return weights.map((weight, index) => {
    const count = index === weights.length - 1
      ? remaining
      : Math.min(Math.round(value * (weight / weightTotal)), remaining);
    remaining = Math.max(remaining - count, 0);
    return count;
  });
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
  return `
    <section class="task-info-panel strategy-panel-compact">
      <div class="task-panel-title"><h3>升级策略</h3></div>
      <div class="task-strategy-grid">
        <dl><dt>升级方式</dt><dd>${detail.method}</dd></dl>
        <dl><dt>升级包</dt><dd>${detail.packageType}</dd></dl>
      </div>
    </section>
  `;
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
  if (isVersionBatchDetailMode()) return plannedBatchTotal() || Math.max(stats.stocked, 1);
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
  if (isVersionBatchDetailMode() && !plannedBatchTotal()) {
    return `当前已处理 ${Number(stats.stocked).toLocaleString()} 台，任务最大下发数量不限制`;
  }
  return `当前进度：${Number(stats.stocked).toLocaleString()} / ${Number(denominator).toLocaleString()} 台，约 ${percent}%`;
}

function renderTaskConditionPanel(detail) {
  const isVersionMode = isVersionFullDetailMode() || isVersionBatchDetailMode() || isVersionSyncDetailMode();
  const sourceTitle = isVersionMode ? "指定源版本" : "设备来源";
  const sourceContent = isVersionMode ? renderTaskSourceVersions(detail, state.detailSourceExpanded ? Infinity : 4) : detail.sourceScope;
  const hasMore = isVersionMode && (detail.sourceVersions?.length || 0) > 4;
  const regionLabel = detail.method === "指定版本" ? "指定分发范围" : "分发方式";
  const regionContent = detail.method === "指定版本"
    ? renderDispatchRegionTags(detail.dispatchRegions)
    : `<span class="condition-chip">按设备所属大区自动分发</span>`;
  const strategyCondition = detail.strategyCondition?.text || "未配置";
  return `
    <section class="task-condition-panel">
      <div class="task-panel-title">
        <h3>策略条件</h3>
        ${hasMore ? `<button class="link-btn" type="button" data-action="toggle-detail-source">${state.detailSourceExpanded ? "收起" : "展开全部"}</button>` : ""}
      </div>
      <div class="condition-summary-grid">
        <dl><dt>${regionLabel}</dt><dd>${regionContent}</dd></dl>
        <dl><dt>${sourceTitle}</dt><dd>${sourceContent}</dd></dl>
        <dl><dt>策略条件</dt><dd><span class="condition-chip ${strategyCondition === "未配置" ? "muted" : ""}">${escapeHtml(strategyCondition)}</span></dd></dl>
      </div>
    </section>
  `;
}

function overviewDeviceScale(detail) {
  if (isVersionFullDetailMode() || isVersionSyncDetailMode()) return "全量";
  if (isVersionBatchDetailMode()) return plannedBatchTotal() ? `${Number(plannedBatchTotal()).toLocaleString()} 台` : "不限制";
  return `${Number(detail.total).toLocaleString()} 台`;
}

function taskOverviewFields(detail) {
  const fields = [
    { label: "任务名称", icon: "log", value: detail.name, span: "wide" },
    { label: "目标版本", icon: "layer", value: detail.targetVersion },
    { label: "任务时间", icon: "clock", value: `${detail.startAt} ~ ${detail.endAt}`, span: "wide" },
    { label: detail.method === "指定版本" ? "指定分发范围" : "分发方式", icon: "map", value: detail.method === "指定版本" ? renderDispatchRegionTags(detail.dispatchRegions) : "按设备所属大区自动分发" },
    { label: "创建人", icon: "users", value: detail.creator },
    { label: "升级方式", icon: "shield", value: detail.method },
    { label: "升级包", icon: "layer", value: detail.packageType },
  ];

  if (isVersionFullDetailMode() || isVersionBatchDetailMode()) {
    fields.push(
      {
        label: "升级设备数",
        icon: "users",
        value: isVersionBatchDetailMode() ? dispatchQuantitySummary(detail) : "全量",
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
        value: `指定分发范围 = ${dispatchRegionSummary(detail.dispatchRegions)}；设备当前版本命中任一指定源版本后纳入匹配。`,
        span: "full",
      },
    );
  } else {
    fields.push(
      { label: "升级设备数", icon: "users", value: `${Number(detail.total).toLocaleString()} 台` },
      { label: "设备来源", icon: "log", value: detail.sourceScope, span: "wide" },
      { label: "分发方式", icon: "map", value: "按设备所属大区自动分发", span: "wide" },
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

function metricStats(detail) {
  const running = Number(detail.running || 0);
  const stocked = Math.max(detail.success + detail.failed + running, 0);
  const total = Number(detail.total) || 0;
  const pending = isVersionFullDetailMode()
    ? 0
    : Math.max(total - stocked, 0);
  return {
    stocked,
    upgradeSuccess: detail.success,
    upgradeFailed: detail.failed,
    running,
    pending,
  };
}

function metricStatsForCurrentView(detail) {
  if (detail.method !== "指定版本") return metricStats(detail);
  const row = dispatchRegionExecutionRows(detail).find(item => regionTabKey(item.region) === selectedDetailRegionKey(detail));
  if (!row) return metricStats(detail);
  return {
    stocked: row.matched,
    upgradeSuccess: row.success,
    upgradeFailed: row.failed,
    running: row.running,
    pending: Math.max(row.matched - row.dispatched, 0),
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
    const planText = plan ? `最大 ${Number(plan).toLocaleString()} 台` : "最大不限制";
    if (detail.status === "已结束") return `已匹配 ${Number(stats.stocked).toLocaleString()} / ${planText}，剩余名额不再继续匹配`;
    return `已匹配 ${Number(stats.stocked).toLocaleString()} / ${planText}`;
  }
  if (detail.status === "已结束") {
    return `执行进度：已处理 ${Number(stats.stocked).toLocaleString()} / ${Number(detail.total).toLocaleString()} 台，未处理设备不再继续下发`;
  }
  return `执行进度：已处理 ${Number(stats.stocked).toLocaleString()} / ${Number(detail.total).toLocaleString()} 台`;
}

function renderTaskFlowOverview(detail) {
  const summary = taskFlowSummary(detail);
  return `
    <section class="task-flow-overview-card ${summary.tone}">
      ${renderTaskFlowProgress(detail)}
      ${renderTaskFlowRecords(detail)}
    </section>
  `;
}

function renderTaskFlowProgress(detail) {
  const nodes = taskFlowNodes(detail);
  return `
    <div class="task-progress-compact">
      <h4 class="task-progress-title">任务进度</h4>
      <div class="task-flow-stage-line compact" style="--flow-progress:${taskFlowProgressPercent(nodes)}%">
        ${nodes.map(node => `
          <span class="${node.type}" title="${node.title}">
            ${node.type === "done" ? icon("check") : node.type === "error" ? icon("close") : icon(node.icon)}
          </span>
        `).join("")}
      </div>
      <div class="task-progress-stage-labels">
        ${nodes.map(node => `
          <span class="${node.type}">
            <strong>${node.title}</strong>
            <em>${node.time || "-"}</em>
          </span>
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

function renderTaskFlowRecords(detail) {
  const records = taskFlowRecords(detail);
  return `
    <div class="task-flow-records-panel">
      <div class="task-flow-records-head">
        <h4>流转明细</h4>
        <span>${records.length} 条记录</span>
      </div>
      <div class="task-flow-record-list">
        ${records.map(record => `
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
    records.push({ title: "发布任务", operator: detail.creator, time: detail.submittedAt, desc: "任务已进入待执行队列", type: "done" });
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
  if (isVersionBatchDetailMode() && !denominator) return `已处理 ${Number(stats.stocked).toLocaleString()} 台，最大下发不限制`;
  return `已处理 ${Number(stats.stocked).toLocaleString()} / ${Number(denominator).toLocaleString()} 台`;
}

function taskFlowNodes(detail) {
  const approvalDone = ["待执行", "升级中", "已完成", "已结束"].includes(detail.status);
  const executionStarted = ["升级中", "已完成", "已结束"].includes(detail.status);
  const needsApproval = requiresApprovalForDetail();
  const nodes = [
    { title: "创建任务", desc: "完成任务信息与升级策略配置", time: detail.createdAt, type: "done", icon: "log" },
    { title: needsApproval ? "提交审批" : "发布任务", desc: needsApproval ? "提交至产线负责人审批" : "发布后进入待执行", time: detail.submittedAt, type: "done", icon: "users" },
    { title: needsApproval ? "审批结果" : "执行队列", desc: needsApproval ? "等待审批结果" : "进入执行队列", time: needsApproval ? taskApprovalNodeTime(detail) : detail.submittedAt, type: needsApproval ? "pending" : "done", icon: needsApproval ? "shield" : "clock" },
    { title: "等待执行", desc: `计划 ${detail.startAt} 自动开始下发`, time: detail.startAt, type: "pending", icon: "clock" },
    { title: "OTA 下发", desc: "系统按策略下发 OTA 指令", time: executionStarted ? detail.startAt : "-", type: "pending", icon: "refresh" },
    { title: "任务结束", desc: "归档最终升级结果", time: taskFinishNodeTime(detail), type: "pending", icon: "check" },
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
    nodes[4] = { ...nodes[4], desc: "执行过程中被提前结束", type: "done" };
    nodes[5] = { ...nodes[5], desc: detail.endReason, type: "ended", icon: "close" };
  }

  return nodes;
}

function taskApprovalNodeTime(detail) {
  if (["已驳回", "已失效", "待执行", "升级中", "已完成", "已结束"].includes(detail.status)) {
    return detail.status === "已失效" ? "2026-06-04 09:00:00" : detail.approvedAt;
  }
  return "-";
}

function taskFinishNodeTime(detail) {
  if (detail.status === "已完成") return "2026-06-12 18:30:22";
  if (detail.status === "已结束") return detail.endedAt;
  return "-";
}

function renderExecutionOverview(detail) {
  const stats = metricStatsForCurrentView(detail);
  if (!isDetailExecutionStatus(detail)) {
    const label = isVersionFullDetailMode() ? "升级规模" : isVersionBatchDetailMode() ? "任务最大下发数量" : "升级设备总数";
    const value = isVersionFullDetailMode() ? "全量" : isVersionBatchDetailMode() ? (plannedBatchTotal() ? `${Number(plannedBatchTotal()).toLocaleString()} 台` : "不限制") : `${Number(detail.total).toLocaleString()} 台`;
    const waitingValue = requiresApprovalForDetail() ? "等待审批" : "等待执行";
    const reasonCard = detail.status === "已驳回"
      ? `<div class="detail-metric red">${icon("close")}<span>驳回原因</span><strong>${detail.rejectReason}</strong></div>`
      : detail.status === "已失效"
        ? `<div class="detail-metric red">${icon("alert")}<span>失效原因</span><strong>${detail.invalidReason}</strong></div>`
        : detail.status === "待执行"
          ? `<div class="detail-metric gray">${icon("clock")}<span>计划开始时间</span><strong>${detail.startAt}</strong></div>`
          : `<div class="detail-metric orange">${icon("shield")}<span>当前节点</span><strong>${waitingValue}</strong></div>`;
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

function renderUpgradeDetailOverview(detail) {
  return `
    <div class="upgrade-detail-overview">
      <h3 class="section-title">${icon("layer")}升级概览</h3>
      ${renderExecutionOverview(detail)}
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
  const runningWidth = total ? (stats.running / total) * 100 : 0;
  const unresolvedWidth = Math.max(100 - successWidth - failedWidth - runningWidth, 0);
  const sourceLabel = isManualDetailMode() ? "手动导入" : "文件导入";
  const sourceText = isManualDetailMode()
    ? "小批量验证任务，设备总数以手动录入设备为准。"
    : "固定清单任务，设备总数以导入清单为准。";
  const cards = [
    ["升级设备总数", `${Number(total).toLocaleString()} 台`, "blue", "users"],
    ["已处理", `${Number(processed).toLocaleString()} 台`, "blue", "refresh"],
    ["升级成功", `${Number(stats.upgradeSuccess).toLocaleString()} 台`, "green", "check"],
    ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} 台`, "red", "alert"],
    ["升级中", `${Number(stats.running).toLocaleString()} 台`, "orange", "clock"],
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
          <strong>已处理 ${Number(processed).toLocaleString()} / 总数 ${Number(total).toLocaleString()} 台，处理率 ${percent.toFixed(1)}%</strong>
        </div>
        <p>${sourceText}</p>
      </div>
      <div class="fixed-progress-bar" aria-label="固定清单升级进度">
        <i class="success" style="width:${successWidth.toFixed(2)}%"></i>
        <i class="failed" style="width:${failedWidth.toFixed(2)}%"></i>
        <i class="running" style="width:${runningWidth.toFixed(2)}%"></i>
        <i class="pending" style="width:${unresolvedWidth.toFixed(2)}%"></i>
      </div>
      <div class="fixed-progress-legend">
        <span><i class="success"></i>成功 ${Number(stats.upgradeSuccess).toLocaleString()} 台</span>
        <span><i class="failed"></i>失败 ${Number(stats.upgradeFailed).toLocaleString()} 台</span>
        <span><i class="running"></i>升级中 ${Number(stats.running).toLocaleString()} 台</span>
        <span><i class="pending"></i>未处理 ${Number(unresolved).toLocaleString()} 台</span>
      </div>
    </section>
  `;
}

function renderExecutionProgressInline(detail, stats) {
  const description = isVersionFullDetailMode()
    ? detailExecutionSummary(detail)
    : isVersionBatchDetailMode()
      ? (plannedBatchTotal() ? `已处理 ${Number(stats.stocked).toLocaleString()} / 最大 ${Number(plannedBatchTotal()).toLocaleString()} 台` : `已处理 ${Number(stats.stocked).toLocaleString()} 台，最大下发不限制`)
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
      ["升级中", `${Number(stats.running).toLocaleString()} 台`, "orange", "clock"],
    ];
  }
  if (isVersionBatchDetailMode()) {
    return [
      ["已匹配数", `${Number(stats.stocked).toLocaleString()} 台`, "blue", "refresh"],
      ["升级成功", `${Number(stats.upgradeSuccess).toLocaleString()} 台`, "green", "check"],
      ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} 台`, "red", "alert"],
      ["升级中", `${Number(stats.running).toLocaleString()} 台`, "orange", "clock"],
    ];
  }
  return [
    ["已处理数", `${Number(stats.stocked).toLocaleString()} 台`, "blue", "refresh"],
    ["升级成功", `${Number(stats.upgradeSuccess).toLocaleString()} 台`, "green", "check"],
    ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} 台`, "red", "alert"],
    ["升级中", `${Number(stats.running).toLocaleString()} 台`, "orange", "clock"],
  ];
}

function renderExceptionSummary(detail) {
  if (!metricStatsForCurrentView(detail).upgradeFailed) {
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
            <span data-exception-center-label data-default="${detail.method === "指定版本" ? "当前分区异常" : "异常总数"}">${detail.method === "指定版本" ? "当前分区异常" : "异常总数"}</span>
            <strong data-exception-center-value data-default="${Number(total).toLocaleString()} 台">${Number(total).toLocaleString()} 台</strong>
            <em data-exception-center-percent data-default="${detail.method === "指定版本" ? "当前分区" : "异常占比"}">${detail.method === "指定版本" ? "当前分区" : "异常占比"}</em>
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
  const total = Number(metricStatsForCurrentView(detail).upgradeFailed) || 0;
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
  const selectedRegion = selectedDetailRegionName(detail);
  const rowModels = deviceDetailRows(detail, selectedRegion);
  const regionRows = selectedRegion ? rowModels.filter(row => row.region === selectedRegion) : rowModels;
  const filteredRows = keyword ? regionRows.filter(row => row.id.toLowerCase().includes(keyword)) : regionRows;
  const rows = filteredRows.length
    ? filteredRows.map(renderDeviceDetailRow).join("")
    : `<tr class="empty-row"><td colspan="9">${selectedRegion ? "当前分发范围下暂无符合条件的设备" : "暂无符合条件的设备"}</td></tr>`;
  return `
    <div class="section-title-row">
      <h3 class="section-title">${icon("layer")}设备列表</h3>
      ${detail.method === "指定版本" ? `<span class="section-subtitle">当前范围：${escapeHtml(selectedRegion)}</span>` : ""}
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

function deviceDetailRows(detail, selectedRegion = "") {
  const limit = deviceDetailRowLimit(detail);
  if (detail.method !== "指定版本") {
    return deviceRows.slice(0, limit).map((id, index) => buildDeviceDetailRow(detail, id, index));
  }
  const region = selectedRegion || selectedDetailRegionName(detail);
  const regionMetric = dispatchRegionExecutionRows(detail).find(row => row.region === region);
  const versionLimit = versionDeviceSampleLimit(detail, regionMetric);
  return deviceRows.slice(0, versionLimit).map((id, index) => buildDeviceDetailRow(detail, id, index, region, regionMetric));
}

function deviceDetailRowLimit(detail) {
  if (isManualDetailMode()) return Math.min(Number(detail.total) || 2, deviceRows.length);
  if (isVersionFullDetailMode() && detail.status === "已结束") return Math.min(8, deviceRows.length);
  return deviceRows.length;
}

function renderDeviceDetailNote(detail) {
  const note = isVersionFullDetailMode()
    ? detail.status === "已结束"
      ? "指定版本全量任务已停止继续动态匹配；升级明细仅展示已匹配并进入当前分区链路的设备。"
      : "指定版本全量任务无法提前统计设备总数；升级明细展示已动态匹配并进入下发链路的设备。"
    : isVersionBatchDetailMode()
      ? `指定版本批量任务按单批数量控制节奏；${plannedBatchTotal() ? `任务最大下发 ${Number(plannedBatchTotal()).toLocaleString()} 台，达到后停止继续匹配新设备。` : "任务最大下发数量不限制，执行期持续动态匹配符合条件设备。"}`
      : "文件/手动导入任务设备清单固定，升级明细展示已纳入本次升级的设备。";
  return `<div class="detail-inline-note">${icon("info")}${note}</div>`;
}

function buildDeviceDetailRow(detail, id, index, forcedRegion = "", sampleMetric = null) {
  const sample = deviceDetailSampleCounts(detail, sampleMetric);
  const sampleRegions = ["中国 / 杭州低功耗", "中国 / 杭州", "香港", "法兰福克", "硅谷"];
  const dispatchRegions = expandedDispatchRegions(detail.dispatchRegions?.length ? detail.dispatchRegions : sampleRegions);
  const failed = index < sample.failedCount;
  const success = !failed && index - sample.failedCount < sample.successCount;
  const running = !failed && !success && index - sample.failedCount - sample.successCount < sample.runningCount;
  const pending = !failed && !success && !running;
  const terminated = detail.status === "已结束" && pending;
  const waiting = detail.status === "升级中" && pending;
  const dispatchStatus = terminated
    ? "未继续下发"
    : waiting
      ? "待下发"
      : isVersionFullDetailMode()
        ? "动态匹配后下发"
        : "已下发";
  const upgradeStatus = terminated
    ? statusTag("已终止")
    : waiting
      ? statusTag("待升级")
      : failed
        ? statusTag("异常")
        : statusTag(success || detail.status === "已完成" ? "已完成" : "升级中");
  const finishedAt = success || failed ? "2026-06-10 11:32:18" : "-";
  const reason = terminated ? "任务已提前结束，未进入下发链路" : failed ? "设备离线，升级状态未回传" : "-";
  const reportedAt = terminated || waiting ? "-" : running ? "2026-06-10 11:34:08" : "2026-06-10 11:35:22";
  return {
    id,
    sourceVersion: `23.110.105.${index % 2 ? "46" : "43"}`,
    targetVersion: detail.targetVersion,
    region: detail.method === "指定版本" ? (forcedRegion || dispatchRegions[index % dispatchRegions.length]) : sampleRegions[index % sampleRegions.length],
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

function deviceDetailSampleCounts(detail, sampleMetric = null) {
  const totalRows = sampleMetric ? versionDeviceSampleLimit(detail, sampleMetric) : deviceDetailRowLimit(detail);
  const successSource = Number(sampleMetric?.success ?? detail.success ?? 0);
  const failedSource = Number(sampleMetric?.failed ?? detail.failed ?? 0);
  const runningSource = Number(sampleMetric?.running ?? detail.running ?? 0);
  const pendingSource = Number(sampleMetric ? 0 : detail.pending ?? 0);
  const failedCount = Math.min(failedSource, 3, totalRows);
  let remaining = Math.max(totalRows - failedCount, 0);
  const reservePending = pendingSource > 0 && ["升级中", "已结束"].includes(detail.status) ? Math.min(1, remaining) : 0;
  remaining -= reservePending;
  let runningCount = detail.status === "升级中" ? Math.min(runningSource, 3, remaining) : 0;
  remaining -= runningCount;
  let successCount = Math.min(successSource, remaining);
  remaining -= successCount;
  if (detail.status === "升级中" && runningSource > runningCount && remaining > 0) {
    const extraRunning = Math.min(runningSource - runningCount, remaining);
    runningCount += extraRunning;
    remaining -= extraRunning;
  }
  if (successSource > successCount && remaining > 0) {
    successCount += Math.min(successSource - successCount, remaining);
  }
  return { failedCount, successCount, runningCount };
}

function versionDeviceSampleLimit(detail, regionMetric) {
  if (!regionMetric?.matched) return 0;
  const failedCount = Math.min(Number(regionMetric.failed) || 0, 3, deviceRows.length);
  let remaining = Math.max(deviceRows.length - failedCount, 0);
  const runningCount = detail.status === "升级中" ? Math.min(Number(regionMetric.running) || 0, 3, remaining) : 0;
  remaining -= runningCount;
  const sampleSuccessCap = detail.status === "已结束" ? 5 : 4;
  const successCount = Math.min(Number(regionMetric.success) || 0, sampleSuccessCap, remaining);
  return Math.min(failedCount + runningCount + successCount, deviceRows.length);
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
  const task = findTaskById(state.lastPublishedTaskId);
  const isManual = state.strategy === "manual";
  const taskStatus = task?.status || (isManual ? manualPublishStatus() : meta.nextStatus);
  const title = isManual ? "任务发布成功" : "任务已提交审批";
  const desc = isManual
    ? "任务已创建。"
    : "任务已提交审批。";
  const dispatchContent = state.strategy === "version"
    ? renderMiniDispatchRegionTags(taskDispatchRegions(task) || state.dispatchRegions)
    : "按设备所属大区自动分发";

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
            <dt>任务编号</dt><dd><code>${task?.id || "-"}</code></dd>
            <dt>任务名称</dt><dd>${escapeHtml(task?.name || state.form.taskName || "未命名任务")}</dd>
            <dt>升级方式</dt><dd>${task?.method || meta.short}</dd>
            <dt>升级包</dt><dd>${task?.packageType || (state.packageType === "whole" ? "整包" : "差分包")}</dd>
            <dt>目标版本</dt><dd>${escapeHtml(task?.targetVersion || state.form.targetVersion)}</dd>
            <dt>任务时间</dt><dd>${escapeHtml(taskStartFromRow(task) || state.taskStartAt)} ~ ${escapeHtml(taskEndFromRow(task) || state.taskEndAt)}</dd>
            <dt>${state.strategy === "version" ? "指定分发范围" : "分发方式"}</dt><dd class="preview-tag-list">${dispatchContent}</dd>
            <dt>设备规模</dt><dd>${finishDeviceScaleText()}</dd>
            <dt>当前状态</dt><dd>${statusTag(taskStatus)}</dd>
          </dl>
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
      alertText: "确认无误后提交审批。",
      action: "提交审批",
      disabled: false,
    };
  }
  const diffPenalty = state.packageType === "diff" && state.strategy !== "manual" ? 418 : 0;
  const scenario = {
    mixed: { bad: Math.max(meta.bad + diffPenalty, 2), good: Math.max(meta.good - diffPenalty, 1), alertClass: "warn", alertTitle: "检测到部分设备不符合发布条件", alertText: "可过滤异常设备后继续发布可升级设备", action: state.strategy === "manual" ? "过滤异常并发布" : "过滤异常并提交审批", disabled: false },
    blocked: { bad: meta.devices, good: 0, alertClass: "error", alertTitle: "无法发布OTA升级任务", alertText: "不存在可升级设备，不支持发布任务", action: "无法发布", disabled: true },
    clean: { bad: 0, good: meta.devices, alertClass: "success", alertTitle: "预检通过", alertText: state.strategy === "manual" ? "全部设备可升级，可正常发布" : "全部设备可升级，可提交审批", action: state.strategy === "manual" ? "立即发布" : "提交审批", disabled: false },
  }[state.previewScenario];
  return { ...scenario, total: meta.devices };
}

function renderPreviewVersionRange() {
  if (state.strategy !== "version") return "-";
  const selectedSet = new Set(state.selectedVersions);
  const rows = firmwareVersions
    .filter(item => selectedSet.has(item.version) && !(state.packageType === "diff" && !item.diffReady))
    .map(item => {
      const deviceCount = state.quantityMode === "full" ? "全量" : `单批 ${Number(state.batchLimit || 0).toLocaleString()} 台`;
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
  return "";
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
  const dispatchText = state.strategy === "version"
    ? renderMiniDispatchRegionTags(state.dispatchRegions)
    : "按设备所属大区自动分发";
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
            <dt>${state.strategy === "version" ? "指定分发范围：" : "分发方式："}</dt><dd class="preview-tag-list">${dispatchText}</dd>
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
            <dt>分发口径：</dt><dd>${state.strategy === "version" ? "指定分发范围" : "按设备所属大区自动分发"}</dd>
            <dt>策略条件：</dt><dd>${strategyConditionText()}</dd>
            <dt>升级数量：</dt><dd>${state.strategy === "version" ? dispatchQuantitySummary() : state.quantityMode === "full" ? "全量" : "批量"}</dd>
            <dt>发布动作：</dt><dd>${state.strategy === "manual" ? "确认发布" : "提交审批"}</dd>
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
            <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>${state.packageType === "diff" ? "无可用差分包：源版本未匹配差分基线" : "设备不存在、机型不匹配或版本不满足升级条件"}</span><span class="mini-tag">${state.previewScenario === "blocked" ? Math.floor(data.bad * 0.58) : Math.max(data.bad - 2, 0)}台</span></div>
          </div>
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
  return "";
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
  const task = findTaskById(state.selectedTaskId);
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal medium" role="dialog" aria-modal="true" aria-labelledby="endTitle" data-stop>
        <header class="modal-header"><span id="endTitle">结束任务</span><button class="modal-close" data-action="close-modal">${icon("close")}</button></header>
        <div class="modal-body">
          ${task ? `<div class="modal-task-context"><span>当前任务</span><strong>${escapeHtml(task.name)}</strong><code>${task.id}</code></div>` : ""}
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
              <dt>分发方式：</dt><dd>按设备所属大区自动分发</dd>
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
      if (el.dataset.route === "task-detail") {
        const taskId = taskIdFromElement(el);
        if (taskId) selectTask(taskId);
      }
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
        "toggle-dispatch-region",
        "toggle-strategy-condition",
        "add-strategy-condition",
        "remove-strategy-condition",
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
      if (state.quantityMode === "batch" && state.batchLimit == null) state.batchLimit = 500;
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

  root.querySelectorAll("[data-batch-limit]").forEach(input => {
    input.addEventListener("change", () => updateBatchLimit(input));
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateBatchLimit(input);
      }
    });
  });

  root.querySelectorAll("[data-max-dispatch-total]").forEach(input => {
    input.addEventListener("change", () => updateMaxDispatchTotal(input));
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateMaxDispatchTotal(input);
      }
    });
  });

  root.querySelectorAll("[data-strategy-condition-field]").forEach(select => {
    select.addEventListener("change", () => {
      updateStrategyConditionRow(select.dataset.conditionId, { field: select.value });
      render();
    });
  });

  root.querySelectorAll("[data-strategy-condition-operator]").forEach(select => {
    select.addEventListener("change", () => {
      updateStrategyConditionRow(select.dataset.conditionId, { operator: select.value });
      render();
    });
  });

  root.querySelectorAll("[data-strategy-condition-values]").forEach(input => {
    input.addEventListener("input", () => {
      updateStrategyConditionRow(input.dataset.conditionId, { values: input.value });
    });
    input.addEventListener("change", () => {
      updateStrategyConditionRow(input.dataset.conditionId, { values: input.value });
      render();
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

function updateBatchLimit(input) {
  state.batchLimit = Math.max(0, Number(input.value || 0));
  if (state.batchLimit > 0) delete state.errors.batchLimit;
  render();
}

function updateMaxDispatchTotal(input) {
  const rawValue = input.value.trim();
  state.maxDispatchTotal = rawValue === "" ? "" : Math.max(0, Number(rawValue || 0));
  if (state.maxDispatchTotal === "" || Number(state.maxDispatchTotal) >= Number(state.batchLimit || 0)) {
    delete state.errors.maxDispatchTotal;
  }
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
    if (!state.form.targetVersion) errors.targetVersion = "请选择目标固件版本";
    if (!state.taskStartAt || !state.taskEndAt) errors.taskTime = "请选择任务起止时间";
    if (!state.form.upgradeDesc.trim()) errors.upgradeDesc = "请输入任务升级说明";
    if (!state.packageType) errors.strategy = "请选择升级包类型";
  }
  if (step === 2) {
    if (!state.strategy) errors.strategy = "请选择升级方式";
    if (state.strategy === "version" && !normalizeDispatchRegions(state.dispatchRegions).length) errors.dispatchRegions = "请选择指定分发范围";
    if (state.strategy === "version" && !state.selectedVersions.length) errors.strategy = "请至少选择一个源版本";
    if (state.strategy === "version" && state.quantityMode === "batch" && Number(state.batchLimit) <= 0) errors.batchLimit = "请输入大于 0 的单批下发数量";
    if (state.strategy === "version" && state.quantityMode === "batch" && state.maxDispatchTotal !== "" && Number(state.maxDispatchTotal) < Number(state.batchLimit)) errors.maxDispatchTotal = "任务最大下发数量不能小于单批下发数量";
    if (state.strategy === "file" && state.fileUploadStatus !== "uploaded") errors.fileUpload = "请先上传设备清单";
    if (state.strategy === "manual" && !state.manualDevices.some(device => device.deviceId && device.status === "可升级")) errors.manualDevices = "请至少添加一台可升级设备";
  }
  state.errors = errors;
  return Object.keys(errors);
}

function validatePublishReady() {
  const errors = {};
  if (!state.form.taskName.trim()) errors.taskName = "请输入任务名称";
  if (!state.form.targetVersion) errors.targetVersion = "请选择目标固件版本";
  if (!state.taskStartAt || !state.taskEndAt) errors.taskTime = "请选择任务起止时间";
  if (!state.form.upgradeDesc.trim()) errors.upgradeDesc = "请输入任务升级说明";
  if (!state.packageType) errors.strategy = "请选择升级包类型";
  if (!state.strategy) errors.strategy = "请选择升级方式";
  if (state.strategy === "version" && !normalizeDispatchRegions(state.dispatchRegions).length) errors.dispatchRegions = "请选择指定分发范围";
  if (state.strategy === "version" && !state.selectedVersions.length) errors.strategy = "请至少选择一个源版本";
  if (state.strategy === "version" && state.quantityMode === "batch" && Number(state.batchLimit) <= 0) errors.batchLimit = "请输入大于 0 的单批下发数量";
  if (state.strategy === "version" && state.quantityMode === "batch" && state.maxDispatchTotal !== "" && Number(state.maxDispatchTotal) < Number(state.batchLimit)) errors.maxDispatchTotal = "任务最大下发数量不能小于单批下发数量";
  if (state.strategy === "file" && state.fileUploadStatus !== "uploaded") errors.fileUpload = "请先上传设备清单";
  if (state.strategy === "manual" && !state.manualDevices.some(device => device.deviceId && device.status === "可升级")) errors.manualDevices = "请至少添加一台可升级设备";
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
      showToast("当前版本已移除全局区域上下文入口");
      break;
    case "toggle-region-dropdown":
      showToast("文件/手动按设备所属大区自动分发，指定版本在策略配置中选择分发大区");
      break;
      state.regionDropdownOpen = !state.regionDropdownOpen;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      render();
      break;
    case "toggle-condition-region-dropdown":
      if (!state.conditionRegionEnabled) {
        showToast("当前版本不再支持创建时按大区过滤");
        break;
      }
      if (isSyncCreateTask()) {
        showToast("当前版本按新分发规则处理区域归属");
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
        showToast("当前版本不再支持创建时按大区过滤");
        break;
      }
      if (isSyncCreateTask()) {
        showToast("当前版本按新分发规则处理区域归属");
        break;
      }
      state.regionOperatorOpen = !state.regionOperatorOpen;
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      render();
      break;
    case "toggle-condition-region-enabled":
      showToast("当前版本不再支持创建时按大区过滤");
      break;
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
    case "toggle-strategy-condition":
      state.strategyConditionEnabled = !state.strategyConditionEnabled;
      if (state.strategyConditionEnabled && !normalizeStrategyConditionRows(state.strategyConditions).length) {
        state.strategyConditions = defaultStrategyConditions();
        state.strategyConditionNextId = 2;
      }
      render();
      break;
    case "add-strategy-condition": {
      const nextId = Number(state.strategyConditionNextId || 1);
      state.strategyConditions = [
        ...normalizeStrategyConditionRows(state.strategyConditions),
        { id: nextId, field: "设备标签", operator: "等于", values: "" },
      ];
      state.strategyConditionNextId = nextId + 1;
      render();
      break;
    }
    case "remove-strategy-condition": {
      const rowId = Number(el.dataset.conditionId);
      const rows = normalizeStrategyConditionRows(state.strategyConditions).filter(row => row.id !== rowId);
      state.strategyConditions = rows.length ? rows : defaultStrategyConditions();
      render();
      break;
    }
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
    case "toggle-dispatch-region": {
      const region = el.dataset.region;
      if (!region) break;
      const selectedSet = new Set(normalizeDispatchRegions(state.dispatchRegions));
      if (region === "中国") {
        const checked = selectedSet.has("中国") || chinaDispatchChildren.every(child => selectedSet.has(child));
        selectedSet.delete("中国");
        chinaDispatchChildren.forEach(child => selectedSet.delete(child));
        if (!checked) selectedSet.add("中国");
      } else if (chinaDispatchChildren.includes(region)) {
        selectedSet.delete("中国");
        if (selectedSet.has(region)) selectedSet.delete(region);
        else selectedSet.add(region);
      } else {
        if (selectedSet.has(region)) selectedSet.delete(region);
        else selectedSet.add(region);
      }
      state.dispatchRegions = normalizeDispatchRegions([...selectedSet]);
      state.selectedRegions = [...state.dispatchRegions];
      delete state.errors.dispatchRegions;
      showToast(`指定分发范围：${dispatchRegionSummary(state.dispatchRegions)}`);
      render();
      break;
    }
    case "set-top-region": {
      showToast("当前版本已移除全局区域上下文入口");
      break;
    }
    case "confirm-region":
      closeModal();
      state.regionDropdownOpen = false;
      showToast("当前版本已移除全局区域上下文入口");
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
      resetDetailViewContext({ tab: "overview" });
      render();
      break;
    case "set-detail-metric-mode":
      state.detailMetricMode = el.dataset.mode || "versionFull";
      if (state.detailMetricMode === "manual" && ["待审批", "已驳回", "已失效"].includes(state.detailStatus)) {
        state.detailStatus = "待执行";
      }
      normalizeDetailStatusForMode();
      resetDetailViewContext({ tab: "overview" });
      render();
      break;
    case "toggle-detail-source":
      state.detailSourceExpanded = !state.detailSourceExpanded;
      render();
      break;
    case "set-detail-tab":
      state.detailTab = el.dataset.tab || "overview";
      if (state.detailTab !== "devices") state.detailRegionTab = "";
      render();
      break;
    case "set-detail-region-tab":
      state.detailRegionTab = el.dataset.regionTab || "";
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
      const rebuildTask = selectTask(taskIdFromElement(el) || state.selectedTaskId);
      state.editingDraft = true;
      resetCreateTaskState();
      restoreTaskForRebuild(rebuildTask);
      state.createStep = 1;
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
      {
        const keys = validatePublishReady();
        if (keys.length) {
          showToast(state.errors[keys[0]] || "请完善必填信息");
          render();
          break;
        }
      }
      publishCurrentTask();
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
      selectTask(state.lastPublishedTaskId);
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
      selectTask(taskIdFromElement(el) || state.selectedTaskId);
      openModal("confirmEnd");
      break;
    case "confirm-end":
      if (state.selectedTaskId) {
        let updatedLocalTask = null;
        state.createdTasks = state.createdTasks.map(task => task.id === state.selectedTaskId
          ? (updatedLocalTask = {
              ...task,
              status: "已结束",
              updatedAt: formatDateTime(new Date()),
              result: task.result || publishedEndResultForTask(task),
            })
          : task);
        if (!updatedLocalTask) {
          const currentTask = findTaskById(state.selectedTaskId);
          if (currentTask) {
            updatedLocalTask = {
              ...currentTask,
              status: "已结束",
              updatedAt: formatDateTime(new Date()),
              result: currentTask.result || publishedEndResultForTask(currentTask),
            };
            state.taskOverrides[state.selectedTaskId] = {
              status: updatedLocalTask.status,
              updatedAt: updatedLocalTask.updatedAt,
              result: updatedLocalTask.result,
            };
          }
        }
        if (updatedLocalTask) syncDetailControlsFromTask(updatedLocalTask);
      }
      closeModal();
      showToast("任务已结束");
      render();
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
