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
  "待执行": { color: "gray", actions: ["detail"] },
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
};

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
  state.createStep = draft.createStep;
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
      ${navGroups.map(group => navSection(group.key, group.title, group.icon, group.items, active)).join("")}
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
      ${renderTaskListHero()}
      ${renderTaskAreaStats()}
      ${renderTaskFilters()}
      ${renderTaskTableToolbar()}
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
      ${renderCreateSteps()}
      <div class="workbench-shell">
        <div class="workbench-main">
          ${renderCreateStepContent()}
        </div>
      </div>
      ${renderWizardActions()}
    </section>
  `;
}

function renderCreateSteps() {
  const steps = [
    ["基础信息", "填写任务信息"],
    ["配置升级策略", "选择升级包和范围"],
    ["预览发布", "查看预检结果"],
    ["完成", state.createStep === 4 ? strategyMeta[state.strategy].nextStatus : "发布结果"],
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
  if (state.createStep === 4) return renderFinishStep();
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
      <div class="form-grid element-form">
        <label class="field-stack ${state.errors.taskName ? "has-error" : ""}">
          <span><span class="required">*</span> 任务名称</span>
          <div class="input-with-count">
            <input class="input" value="${state.form.taskName}" aria-label="任务名称" data-field="taskName" maxlength="64" />
            <span class="count">${state.form.taskName.length} / 64</span>
          </div>
          ${renderFieldError("taskName")}
        </label>
        <label class="field-stack ${state.errors.selectedRegions ? "has-error" : ""}">
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
        <label class="field-stack ${state.errors.targetVersion ? "has-error" : ""}">
          <span><span class="required">*</span> 目标固件版本</span>
          <select class="select" aria-label="目标固件版本" data-field="targetVersion">
            <option value="23.422.209.17" ${state.form.targetVersion === "23.422.209.17" ? "selected" : ""}>${state.packageType === "diff" ? "23.422.209.17（差分包生成成功）" : "23.422.209.17（已上架）"}</option>
            <option>23.110.105.46</option>
            <option>10.176.46</option>
          </select>
          <em class="field-help">已是目标版本的设备不会进入升级范围。</em>
          ${renderFieldError("targetVersion")}
        </label>
        <label class="field-stack ${state.errors.taskTime ? "has-error" : ""}">
          <span><span class="required">*</span> 任务起止时间</span>
          ${renderDateRangePicker()}
          ${renderQuickRangeButtons()}
          ${renderFieldError("taskTime")}
        </label>
        <label class="field-stack wide-field ${state.errors.upgradeDesc ? "has-error" : ""}">
          <span><span class="required">*</span> 任务升级说明</span>
          <textarea class="textarea compact-textarea" placeholder="请输入升级目标、影响范围、灰度或回滚关注点。" aria-label="任务升级说明" data-field="upgradeDesc">${state.form.upgradeDesc}</textarea>
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

function renderFinishStep() {
  return `
    <section class="workbench-card step-card">
      <div class="card-heading">
        <div>
          <span class="eyebrow">Step 4</span>
          <h3>完成</h3>
        </div>
        <span class="soft-pill">任务已创建</span>
      </div>
      <div class="finish-panel">
        <div class="finish-check">${icon("check")}</div>
        <h3>OTA 升级任务创建成功</h3>
        <p>系统将在设定时间窗口内执行任务，执行状态可在任务列表中查看。</p>
        <div class="finish-summary">
          <dl>
            <dt>任务编号</dt><dd><code>OTA-2026-176660</code></dd>
            <dt>任务名称</dt><dd>IPC-杭州低功耗_安全补丁升级</dd>
            <dt>发布策略</dt><dd>${state.packageType === "whole" ? "整包" : "差分包"} · ${strategyMeta[state.strategy].title}</dd>
            <dt>设备规模</dt><dd>${finishDeviceScaleText()}</dd>
            <dt>当前状态</dt><dd>${statusTag(strategyMeta[state.strategy].nextStatus)}</dd>
          </dl>
        </div>
      </div>
    </section>
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
  if (state.createStep === 4) {
    return `
      <div class="sticky-actions">
        <button class="btn" type="button" data-route="task-list">返回任务列表</button>
        <button class="btn primary" type="button" data-route="task-detail">查看任务详情</button>
      </div>
    `;
  }

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
  const detail = taskDetailData(state.detailStatus);
  return `
    <section class="page">
      ${renderPageHeader("任务详情", {
        back: "task-list",
        actions: detail.status === "升级中" ? `<button class="btn danger" type="button" data-action="end-task">结束任务</button>` : "",
      })}
      ${renderDetailStatusSwitch()}
      ${renderDetailHero(detail)}
      ${renderDetailTabs()}
      ${renderDetailTabContent(detail)}
    </section>
  `;
}

function renderDetailTabs() {
  const tabs = [
    ["overview", "概览"],
    ["devices", "设备明细"],
  ];
  return `
    <div class="detail-tabs">
      ${tabs.map(([key, label]) => `<button class="${state.detailTab === key ? "active" : ""}" type="button" data-action="set-detail-tab" data-tab="${key}">${label}</button>`).join("")}
    </div>
  `;
}

function renderDetailTabContent(detail) {
  const isExecutionStatus = ["升级中", "已完成", "已结束"].includes(detail.status);
  if (state.detailTab === "devices") {
    return isExecutionStatus
      ? renderDeviceDetailTable(detail)
      : `<div class="empty-state-panel">${icon("info")} 任务尚未进入执行阶段，暂无设备执行明细。</div>`;
  }
  return `
    ${renderTaskFlow(detail)}
    <h3 class="section-title">${icon("layer")}执行概览</h3>
    ${renderExecutionOverview(detail)}
    ${isExecutionStatus ? renderExceptionSummary(detail) : ""}
  `;
}

function taskDetailData(status) {
  const base = {
    name: "IPC-杭州低功耗_安全补丁升级",
    status,
    creator: "汤彦珊",
    approver: "钱江涛",
    createdAt: "2026-06-03 16:40:12",
    submittedAt: "2026-06-03 17:20:18",
    approvedAt: "2026-06-03 18:10:42",
    startAt: "2026-06-10 09:00:00",
    endAt: "2026-06-17 09:00:00",
    targetVersion: "23.422.209.17",
    method: "指定版本",
    packageType: "整包",
    total: 6505,
    region: "中国 / 杭州低功耗",
    desc: "修复低功耗设备夜间唤醒异常，按杭州低功耗大区灰度发布。",
    sourceScope: "23.422.208.91、23.110.105.46、23.110.105.43、10.176.42",
    condition: "指定地区 = 中国 / 杭州低功耗",
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
  return { ...base, ...(variants[status] || variants["升级中"]) };
}

function renderDetailStatusSwitch() {
  const statuses = ["待审批", "已驳回", "已失效", "待执行", "升级中", "已完成", "已结束"];
  const metricModes = [
    ["imported", "文件/手动导入"],
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
  const progress = upgradeProgressData(detail);
  const meterPercent = `${progress.percent / 2}%`;
  return `
    <div class="task-overview-card ${summary.tone}">
      <div class="task-overview-head">
        <div>
          <h2>任务信息</h2>
        </div>
        ${statusTag(detail.status)}
      </div>
      <div class="task-overview-body">
        <section class="task-overview-info">
          <dl>
            <dt>${icon("log")}任务名称</dt><dd>${detail.name}</dd>
            <dt>${icon("clock")}任务时间</dt><dd>${detail.startAt} ~ ${detail.endAt}</dd>
            <dt>${icon("layer")}目标版本</dt><dd>${detail.targetVersion}</dd>
            <dt>${icon("map")}任务大区</dt><dd>${detail.region}</dd>
            <dt>${icon("users")}创建人</dt><dd>${detail.creator}</dd>
            <dt>${icon("shield")}升级配置</dt><dd>${overviewConfigSummary(detail)}</dd>
          </dl>
        </section>
        <aside class="task-overview-progress">
          <div class="flow-progress-meter" style="--meter-percent:${meterPercent}">
            <b>${progress.label}<small>${progress.unit}</small></b>
          </div>
          <div>
            <span>升级进度：</span><strong>${progress.title}</strong>
            <p>${progress.text}</p>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function overviewConfigSummary(detail) {
  const condition = detail.condition ? "指定地区" : "无额外条件";
  if (state.detailMetricMode === "imported") return `文件/手动导入 · ${detail.packageType} · ${Number(detail.total).toLocaleString()} 台 · ${condition}`;
  if (state.detailMetricMode === "versionBatch") return `${detail.method} · ${detail.packageType} · 计划 ${Number(plannedBatchTotal()).toLocaleString()} 台 · ${condition}`;
  return `${detail.method} · ${detail.packageType} · 全量 · ${condition}`;
}

function upgradeProgressData(detail) {
  const executionStatuses = ["升级中", "已完成", "已结束"];
  if (!executionStatuses.includes(detail.status)) {
    return {
      percent: 0,
      label: "-",
      unit: "",
      title: "未开始升级",
      text: state.detailMetricMode === "imported"
        ? "设备清单已确定，等待进入 OTA 下发阶段"
        : detail.status === "待执行"
          ? "尚未开始动态匹配设备，等待任务开始时间"
          : "任务尚未进入 OTA 下发阶段",
    };
  }
  const stats = metricStats(detail);
  if (state.detailMetricMode === "versionFull") {
    const visualPercent = detail.status === "已完成" ? 100 : detail.status === "已结束" ? 72 : 48;
    return {
      percent: visualPercent,
      label: Number(stats.stocked).toLocaleString(),
      unit: "台",
      title: `已匹配数 ${Number(stats.stocked).toLocaleString()} 台`,
      text: detail.status === "已完成"
        ? `升级成功 ${Number(stats.upgradeSuccess).toLocaleString()} 台，失败 ${Number(stats.upgradeFailed).toLocaleString()} 台`
        : detail.status === "已结束"
          ? `任务已提前结束，升级成功 ${Number(stats.upgradeSuccess).toLocaleString()} 台，失败 ${Number(stats.upgradeFailed).toLocaleString()} 台`
          : `设备持续动态匹配中，已成功 ${Number(stats.upgradeSuccess).toLocaleString()} 台，失败 ${Number(stats.upgradeFailed).toLocaleString()} 台`,
    };
  }
  const denominator = state.detailMetricMode === "versionBatch" ? plannedBatchTotal() : detail.total;
  const processed = Math.min(stats.stocked, denominator);
  const percent = denominator ? Number(((processed / denominator) * 100).toFixed(1)) : 0;
  return {
    percent,
    label: String(percent),
    unit: "%",
    title: `${Number(processed).toLocaleString()} / ${Number(denominator).toLocaleString()} 台`,
    text: state.detailMetricMode === "versionBatch"
      ? `已匹配成功 ${Number(stats.upgradeSuccess).toLocaleString()} 台，失败 ${Number(stats.upgradeFailed).toLocaleString()} 台；系统持续匹配符合条件设备`
      : detail.status === "已完成"
        ? "升级任务已完成，可查看失败设备明细"
        : detail.status === "已结束"
          ? "任务已提前结束，未处理设备不再继续下发"
          : "OTA 执行中，设备结果持续回传",
  };
}

function plannedBatchTotal() {
  return 5000;
}

function metricStats(detail) {
  const dispatchedFailed = state.detailMetricMode === "imported" ? 0 : detail.status === "升级中" ? 12 : detail.status === "已结束" ? 18 : 0;
  const stocked = Math.max(detail.success + detail.failed, 0);
  return {
    stocked,
    dispatchedFailed,
    upgradeSuccess: detail.success,
    upgradeFailed: detail.failed,
    pending: Math.max(detail.total - stocked, 0),
  };
}

function taskFlowSummary(detail) {
  const processed = detail.success + detail.failed;
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
      text: "任务已审批通过，等待到达任务开始时间后自动下发。",
      extra: `计划开始时间：${detail.startAt}`,
      tone: "gray",
    },
    "升级中": {
      node: "执行中",
      text: "任务已进入 OTA 下发阶段，设备正在回传升级结果。",
      extra: `执行进度：已处理 ${processed} / ${detail.total} 台`,
      tone: "blue",
    },
    "已完成": {
      node: "任务完成",
      text: "所有纳入升级范围的设备均已产生最终升级结果。",
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

function renderTaskFlow(detail) {
  const summary = taskFlowSummary(detail);
  const metaItems = flowMetaItems(detail, summary);
  return `
    <section class="task-flow-card ${summary.tone}">
      <div class="task-flow-overview">
        <div class="task-flow-summary">
          <i>${icon(flowIcon(detail.status))}</i>
          <div>
            <h3>任务流转</h3>
            <strong>当前状态：${detail.status}</strong>
            <p>${summary.text}</p>
            <em>${summary.extra}</em>
          </div>
        </div>
        <div class="task-flow-meta">
          ${metaItems.map(([label, value]) => `<span>${label} <b>${value}</b></span>`).join("")}
        </div>
      </div>
      <div class="task-progress-panel">
        <div class="task-progress-tabs">
          <div>
            ${["progress", "records"].map(key => `
              <button class="${state.flowTab === key ? "active" : ""}" type="button" data-action="set-flow-tab" data-tab="${key}">
                ${key === "progress" ? "任务进度" : "流转明细"}
              </button>
            `).join("")}
          </div>
        </div>
        ${state.flowTab === "records" ? renderFlowRecordsPanel(detail) : renderFlowProgressPanel(detail)}
      </div>
    </section>
  `;
}

function renderFlowProgressPanel(detail) {
  return `
    ${renderFlowStages(detail)}
  `;
}

function renderFlowRecordsPanel(detail) {
  return `
    <div class="task-flow-records">
      <h4>流转明细</h4>
      ${renderApprovalTimeline(detail)}
    </div>
  `;
}

function renderFlowProgressSummary(detail) {
  const percent = flowProgressPercent(detail);
  const meterPercent = `${percent / 2}%`;
  const textMap = {
    "待审批": "审批处理中，审批通过后进入等待执行阶段",
    "已驳回": "审批未通过，任务不会继续下发",
    "已失效": "审批超时失效，任务不会继续下发",
    "待执行": "审批已通过，等待任务开始时间自动下发",
    "升级中": "OTA 正在下发执行，预计在任务窗口内完成",
    "已完成": "任务已完成，所有纳入设备已有最终结果",
    "已结束": "任务已提前结束，未处理设备不再继续下发",
  };
  return `
    <div class="flow-progress-summary">
      <div>
        <span>任务进度</span>
        <strong>${percent}%</strong>
      </div>
      <div class="flow-progress-meter" style="--meter-percent:${meterPercent}">
        <b>${percent}<small>%</small></b>
      </div>
      <p>${textMap[detail.status] || "任务状态更新中"}</p>
    </div>
  `;
}

function flowProgressPercent(detail) {
  const map = {
    "待审批": 38,
    "已驳回": 38,
    "已失效": 38,
    "待执行": 62,
    "升级中": 84,
    "已完成": 100,
    "已结束": 86,
  };
  return map[detail.status] || 0;
}

function flowMetaItems(detail, summary) {
  const actionMap = {
    "待审批": "等待产线负责人审批",
    "已驳回": "支持复制重建后重新发布",
    "已失效": "支持复制重建后重新发布",
    "待执行": `等待 ${detail.startAt} 自动下发`,
    "升级中": "持续接收设备升级结果",
    "已完成": "任务已产生最终结果",
    "已结束": "未处理设备不再继续下发",
  };
  return [
    ["提交人", detail.creator],
    ["审批人", detail.approver],
    ["当前节点", summary.node],
    ["提交时间", detail.submittedAt],
    ["审批时间", approvalTimeText(detail)],
    ["下一步/结果", actionMap[detail.status] || "-"],
  ];
}

function approvalTimeText(detail) {
  if (["待审批"].includes(detail.status)) return "-";
  if (detail.status === "已失效") return "2026-06-04 09:00:00";
  return detail.approvedAt || "-";
}

function flowIcon(status) {
  return {
    "待审批": "clock",
    "已驳回": "alert",
    "已失效": "clock",
    "待执行": "clock",
    "升级中": "refresh",
    "已完成": "check",
    "已结束": "close",
  }[status] || "info";
}

function renderApprovalTimeline(detail) {
  const items = [
    ["创建任务", detail.creator, detail.createdAt, "创建 OTA 升级任务", "done"],
    ["提交审批", detail.creator, detail.submittedAt, "提交至产线负责人审批", "done"],
  ];
  if (detail.status === "待审批") items.push(["等待审批", detail.approver, "-", "产线负责人处理中", "active"]);
  if (detail.status === "已驳回") items.push(["审批驳回", detail.approver, detail.approvedAt, detail.rejectReason, "error"]);
  if (detail.status === "已失效") items.push(["审批失效", "系统", "2026-06-04 09:00:00", detail.invalidReason, "error"]);
  if (["待执行", "升级中", "已完成", "已结束"].includes(detail.status)) items.push(["审批通过", detail.approver, detail.approvedAt, "审批通过，任务进入执行队列", "done"]);
  if (detail.status === "待执行") items.push(["等待执行", "系统", detail.startAt, "未到任务下发时间，等待自动执行", "active"]);
  if (["升级中", "已完成", "已结束"].includes(detail.status)) items.push(["开始下发", "系统", detail.startAt, "到达任务开始时间，开始下发 OTA 指令", "done"]);
  if (detail.status === "升级中") items.push(["执行中", "系统", "-", `已处理 ${detail.success + detail.failed} / ${detail.total} 台`, "active"]);
  if (detail.status === "已完成") items.push(["任务完成", "系统", "2026-06-12 18:30:22", "所有纳入设备已有最终结果", "done"]);
  if (detail.status === "已结束") items.push(["手动结束", detail.creator, detail.endedAt, detail.endReason, "error"]);
  return `
    <div class="approval-timeline">
      ${items.map(([title, actor, time, desc, type]) => `
        <div class="timeline-item ${type}">
          <span></span>
          <div>
            <strong>${title}</strong>
            <p>${actor} · ${time}</p>
            <em>${desc}</em>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderFlowStages(detail) {
  const stages = flowStageData(detail);
  const percent = flowProgressPercent(detail);
  return `
    <div class="flow-stage-board" aria-label="任务阶段进度">
      <div class="flow-stage-track" style="--percent:${percent}%">
        ${stages.map((stage, index) => `
          <div class="flow-stage-dot ${stage.type}">
            <i>${stage.type === "done" ? icon("check") : stage.type === "error" ? icon("close") : icon(stage.icon)}</i>
          </div>
        `).join("")}
      </div>
      <div class="flow-stage-cards">
        ${stages.map(stage => `
          <article class="flow-stage-card ${stage.type}">
            <span>${stage.date}</span>
            <strong>${stage.title}</strong>
            <p>${stage.body}</p>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function flowStageData(detail) {
  const approvalDone = ["待执行", "升级中", "已完成", "已结束"].includes(detail.status);
  const executionStarted = ["升级中", "已完成", "已结束"].includes(detail.status);
  const stages = [
    { title: "创建任务", date: "06月03日", body: "创建 OTA 升级任务，完成基础信息与升级策略配置。", type: "done", icon: "log" },
    { title: "提交审批", date: "06月03日", body: "任务提交至产线负责人审批，等待审批结果。", type: "done", icon: "users" },
    { title: "审批结果", date: "06月03日", body: "等待产线负责人确认发布风险与升级范围。", type: "pending", icon: "shield" },
    { title: "等待执行", date: "06月10日", body: "审批通过后进入执行队列，等待到达任务开始时间。", type: "pending", icon: "clock" },
    { title: "OTA 下发", date: "06月10日-06月17日", body: "系统按策略下发 OTA 指令，并接收设备升级结果。", type: "pending", icon: "refresh" },
    { title: "任务结束", date: "06月17日", body: "任务窗口结束后汇总成功、失败与异常设备结果。", type: "pending", icon: "check" },
  ];

  if (detail.status === "待审批") {
    stages[2] = { ...stages[2], body: "当前等待产线负责人审批，审批通过后进入待执行状态。", type: "active" };
  } else if (detail.status === "已驳回") {
    stages[2] = { ...stages[2], body: `审批未通过：${detail.rejectReason}`, type: "error" };
  } else if (detail.status === "已失效") {
    stages[2] = { ...stages[2], body: `审批已失效：${detail.invalidReason}`, type: "error" };
  } else if (approvalDone) {
    stages[2] = { ...stages[2], body: "审批通过，任务进入待执行队列。", type: "done" };
  }

  if (detail.status === "待执行") {
    stages[3] = { ...stages[3], body: `计划 ${detail.startAt} 自动开始下发。`, type: "active" };
  } else if (executionStarted) {
    stages[3] = { ...stages[3], body: "已到达任务开始时间，系统已开始下发。", type: "done" };
  }

  if (detail.status === "升级中") {
    stages[4] = { ...stages[4], body: `执行中，已处理 ${detail.success + detail.failed} / ${detail.total} 台设备。`, type: "active" };
  } else if (detail.status === "已完成") {
    stages[4] = { ...stages[4], type: "done" };
    stages[5] = { ...stages[5], body: "所有纳入设备已有最终升级结果。", type: "done" };
  } else if (detail.status === "已结束") {
    stages[4] = { ...stages[4], body: "执行过程中被用户提前结束。", type: "error" };
    stages[5] = { ...stages[5], body: detail.endReason, type: "error" };
  }

  return stages;
}

function renderFlowExecutionProgress(detail) {
  if (!["升级中", "已完成", "已结束"].includes(detail.status)) return "";
  const processed = detail.success + detail.failed;
  const remaining = Math.max(detail.total - processed, 0);
  const successRate = detail.total ? (detail.success / detail.total) * 100 : 0;
  const failedRate = detail.total ? (detail.failed / detail.total) * 100 : 0;
  const pendingRate = Math.max(100 - successRate - failedRate, 0);
  return `
    <div class="flow-execution-progress">
      <div class="flow-progress-head">
        <strong>执行进度</strong>
        <span>已处理 ${Number(processed).toLocaleString()} / ${Number(detail.total).toLocaleString()} 台，剩余 ${Number(remaining).toLocaleString()} 台</span>
      </div>
      <div class="flow-progress-bar" aria-label="执行进度">
        <span class="success" style="width:${successRate}%"></span>
        <span class="failed" style="width:${failedRate}%"></span>
        <span class="pending" style="width:${pendingRate}%"></span>
      </div>
      <div class="flow-progress-legend">
        <span><i class="success"></i>成功 ${Number(detail.success).toLocaleString()} 台</span>
        <span><i class="failed"></i>失败 ${Number(detail.failed).toLocaleString()} 台</span>
        <span><i class="pending"></i>未完成 ${Number(remaining).toLocaleString()} 台</span>
      </div>
    </div>
  `;
}

function renderExecutionOverview(detail) {
  const stats = metricStats(detail);
  if (!["升级中", "已完成", "已结束"].includes(detail.status)) {
    const label = state.detailMetricMode === "versionFull" ? "升级规模" : state.detailMetricMode === "versionBatch" ? "计划成功下发数量" : "升级设备总数";
    const value = state.detailMetricMode === "versionFull" ? "全量" : state.detailMetricMode === "versionBatch" ? `${Number(plannedBatchTotal()).toLocaleString()} 台` : `${Number(detail.total).toLocaleString()} 台`;
    return `<div class="detail-metrics single"><div class="detail-metric blue"><span>${label}</span><strong>${value}</strong></div></div>`;
  }
  const cards = executionMetricCards(detail, stats);
  const denominator = state.detailMetricMode === "versionBatch" ? plannedBatchTotal() : state.detailMetricMode === "versionFull" ? Math.max(stats.stocked + stats.dispatchedFailed, 1) : detail.total;
  const successRate = denominator ? ((stats.upgradeSuccess / denominator) * 100).toFixed(1) : "0.0";
  const failedRate = denominator ? ((stats.upgradeFailed / denominator) * 100).toFixed(1) : "0.0";
  return `
    <div class="detail-metrics">
      ${cards.map(([label, value, tone]) => `<div class="detail-metric ${tone}"><span>${label}</span><strong>${value}</strong></div>`).join("")}
      <div class="detail-result-bar">
        <span style="width:${successRate}%"></span>
        <em style="width:${failedRate}%"></em>
      </div>
    </div>
  `;
}

function executionMetricCards(detail, stats) {
  if (state.detailMetricMode === "versionFull") {
    return [
      ["已匹配数", `${Number(stats.stocked).toLocaleString()} 台`, "blue"],
      ["升级成功", `${Number(stats.upgradeSuccess).toLocaleString()} 台`, "green"],
      ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} 台`, "red"],
      [detail.status === "已结束" ? "停止继续匹配" : "匹配状态", detail.status === "已完成" ? "匹配完成" : "动态匹配中", "gray"],
    ];
  }
  if (state.detailMetricMode === "versionBatch") {
    const plan = plannedBatchTotal();
    const rate = plan ? ((stats.stocked / plan) * 100).toFixed(1) : "0.0";
    return [
      ["计划成功下发数量", `${Number(plan).toLocaleString()} 台`, "blue"],
      ["已匹配数", `${Number(stats.stocked).toLocaleString()} (${rate}%)`, "green"],
      ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} 台`, "red"],
      ["待匹配名额", `${Number(Math.max(plan - stats.stocked, 0)).toLocaleString()} 台`, "gray"],
    ];
  }
  const successRate = detail.total ? ((stats.upgradeSuccess / detail.total) * 100).toFixed(1) : "0.0";
  const failedRate = detail.total ? ((stats.upgradeFailed / detail.total) * 100).toFixed(1) : "0.0";
  return [
    ["升级设备总数", Number(detail.total).toLocaleString(), "blue"],
    ["升级成功", `${Number(stats.upgradeSuccess).toLocaleString()} (${successRate}%)`, "green"],
    ["升级失败", `${Number(stats.upgradeFailed).toLocaleString()} (${failedRate}%)`, "red"],
    ["进行中/未处理", `${Number(detail.running + detail.pending).toLocaleString()} 台`, "gray"],
  ];
}

function renderExceptionSummary(detail) {
  return `
    <h3 class="section-title">${icon("alert")}异常分类</h3>
    <div class="exception-list">
      <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>设备离线或长时间未上报</span><span class="mini-tag">${Math.max(detail.failed - 5, 0)}台</span></div>
      <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>升级超时或设备主动失败</span><span class="mini-tag">${Math.min(detail.failed, 5)}台</span></div>
    </div>
    <button class="btn" type="button" data-action="download-exception" style="margin-top: 12px">${icon("download")}下载异常明细</button>
  `;
}

function renderDeviceDetailTable(detail) {
  return `
    <h3 class="section-title">${icon("layer")}设备明细</h3>
    <div class="toolbar">
      <label class="field-control search">${icon("search")}<input placeholder="请输入设备ID,按Enter搜索" aria-label="设备ID搜索" /></label>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>设备ID</th><th>源版本</th><th>目标版本</th><th>所属大区</th><th>下发状态</th><th>升级状态</th><th>完成时间</th><th>失败原因</th><th>最近上报时间</th></tr></thead>
        <tbody>${deviceRows.map((id, index) => {
          const failed = index < Math.min(detail.failed, 3);
          const success = index < Math.max(detail.success, 4) && !failed;
          return `<tr><td>${id}</td><td>23.110.105.${index % 2 ? "46" : "43"}</td><td>${detail.targetVersion}</td><td>${detail.region}</td><td>已下发</td><td>${failed ? statusTag("异常") : statusTag(success ? "已完成" : "升级中")}</td><td>${success || failed ? "2026-06-10 11:32:18" : "-"}</td><td>${failed ? "设备离线，升级状态未回传" : "-"}</td><td>2026-06-10 11:35:22</td></tr>`;
        }).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderOperationRecords(detail) {
  const records = [
    ["创建任务", detail.creator, detail.createdAt, "创建 OTA 升级任务"],
    ["提交审批", detail.creator, detail.submittedAt, "提交至产线负责人审批"],
  ];
  if (detail.status === "待审批") records.push(["等待审批", detail.approver, "-", "产线负责人处理中"]);
  if (detail.status === "已驳回") records.push(["审批驳回", detail.approver, detail.approvedAt, detail.rejectReason]);
  if (detail.status === "已失效") records.push(["审批失效", "系统", "2026-06-04 09:00:00", detail.invalidReason]);
  if (["待执行", "升级中", "已完成", "已结束"].includes(detail.status)) records.push(["审批通过", detail.approver, detail.approvedAt, "审批通过，任务进入执行队列"]);
  if (["升级中", "已完成", "已结束"].includes(detail.status)) records.push(["开始下发", "系统", detail.startAt, "到达任务开始时间，开始下发 OTA 指令"]);
  if (detail.status === "已完成") records.push(["任务完成", "系统", "2026-06-12 18:30:22", "所有纳入设备已有最终结果"]);
  if (detail.status === "已结束") records.push(["手动结束", "汤彦珊", detail.endedAt, detail.endReason]);
  return `
    <h3 class="section-title">${icon("log")}操作记录</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>操作动作</th><th>操作人</th><th>操作时间</th><th>说明</th></tr></thead>
        <tbody>${records.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td title="${row[3]}">${row[3]}</td></tr>`).join("")}</tbody>
      </table>
    </div>
  `;
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

function updateFormField(input, shouldRender = false) {
  const key = input.dataset.field;
  state.form[key] = input.value;
  delete state.errors[key];

  const field = input.closest(".field-stack");
  field?.classList.remove("has-error");
  field?.querySelector(".field-error")?.remove();

  if (key === "taskName") {
    const counter = field?.querySelector(".count");
    if (counter) counter.textContent = `${input.value.length} / ${input.maxLength || 64}`;
  }

  if (shouldRender) render();
}

function updateBatchQuantity(input) {
  state.batchQuantity = Math.max(0, Number(input.value || 0));
  if (state.batchQuantity > 0) delete state.errors.batchQuantity;
  render();
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
      render();
      break;
    case "set-detail-metric-mode":
      state.detailMetricMode = el.dataset.mode || "versionFull";
      state.detailTab = "overview";
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
      state.createStep = 4;
      showToast(state.strategy === "manual" ? "发布成功，任务已进入待执行" : "任务已提交，等待产线负责人审批");
      render({ preserveScroll: false });
      break;
    case "next-create-step":
      if (!ensureStepValid(state.createStep)) break;
      state.regionDropdownOpen = false;
      state.conditionRegionDropdownOpen = false;
      state.regionOperatorOpen = false;
      state.createStep = Math.min(state.createStep + 1, 4);
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
