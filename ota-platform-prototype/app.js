const state = {
  route: "task-list",
  packageType: "whole",
  strategy: "version",
  previewScenario: "mixed",
  versionRule: "all",
  quantityMode: "full",
  createStep: 1,
  regionDropdownOpen: false,
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
  { version: "23.422.209.17", count: 6505, diffReady: true, note: "4G 模组基线匹配" },
  { version: "23.110.105.46", count: 2310, diffReady: true, note: "安全补丁版本" },
  { version: "23.110.105.43", count: 1250, diffReady: false, note: "无可用差分包" },
  { version: "10.176.42", count: 664, diffReady: false, note: "整包可跨版本升级" },
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

function icon(name, className = "") {
  return `<svg class="icon ${className}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
}

function setRoute(route) {
  const previousRoute = state.route;
  state.route = route;
  if (route === "create-task") {
    syncCreateRoute();
    if (previousRoute !== "create-task") state.createStep = 1;
  }
  window.history.replaceState(null, "", `#${route}`);
  render();
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

function render() {
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
  return `
    <section class="page">
      ${renderPageHeader("任务列表", {
        actions: `<button class="btn primary" type="button" data-route="create-task">${icon("plus")}新增任务</button>`,
      })}
      <div class="toolbar">
        <label class="field-control search">
          ${icon("search")}
          <input type="search" placeholder="请输入任务名称，按输入搜索" aria-label="任务名称搜索" />
        </label>
        <button class="btn subtle" type="button" data-action="open-status-filter">任务状态 ${icon("chevron")}</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 190px">任务名称</th>
              <th style="width: 120px">升级策略 ${icon("chevron")}</th>
              <th class="center" style="width: 140px">升级设备总数</th>
              <th style="width: 240px">任务时间</th>
              <th class="center" style="width: 120px">升级成功率</th>
              <th class="center" style="width: 140px">升级设备数失败</th>
              <th style="width: 190px">任务所属大区</th>
              <th style="width: 110px">任务状态 ${icon("chevron")}</th>
              <th style="width: 170px">创建时间</th>
              <th style="width: 110px">操作</th>
            </tr>
          </thead>
          <tbody>
            ${taskRows.map(row => `
              <tr>
                <td title="${row[0]}">${row[0]}</td>
                <td>${row[1]}</td>
                <td class="center"><button class="link-btn" type="button" data-route="task-detail">${row[2]}</button></td>
                <td title="${row[3]}">${row[3]}</td>
                <td class="center">${row[4]}</td>
                <td class="center">${row[5]}</td>
                <td>${row[6]}</td>
                <td>${statusTag(row[7])}</td>
                <td>${row[8]}</td>
                <td>
                  <button class="link-btn" type="button" data-route="task-detail">详情</button>
                  ${row[9] ? `<button class="link-btn danger" type="button" data-action="end-task">结束</button>` : ""}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      ${pagination(133, 7)}
    </section>
  `;
}

function statusTag(status) {
  const cls = {
    "升级中": "green",
    "已完成": "blue",
    "待执行": "gray",
    "已结束": "gray",
    "已驳回": "red",
    "不可升级": "orange",
    "可升级": "green",
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
        return `<li class="${cls}"><span>${step}</span><strong>${title}</strong><em>${desc}</em></li>`;
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
        <label class="field-stack">
          <span><span class="required">*</span> 任务名称</span>
          <div class="input-with-count">
            <input class="input" value="IPC-杭州低功耗_安全补丁升级" aria-label="任务名称" />
            <span class="count">17 / 64</span>
          </div>
        </label>
        <label class="field-stack">
          <span><span class="required">*</span> 任务执行大区</span>
          <div class="select-field multi-select-field ${state.regionDropdownOpen ? "open" : ""}" data-action="toggle-region-dropdown">
            <div class="multi-select-values">
              <span class="chip">${icon("check")} 中国 / 杭州低功耗</span>
              <span class="chip">${icon("check")} 中国 / 杭州</span>
            </div>
            ${icon("chevron", "select-arrow")}
            ${state.regionDropdownOpen ? renderRegionDropdown() : ""}
          </div>
        </label>
        <label class="field-stack">
          <span><span class="required">*</span> 目标固件版本</span>
          <select class="select" aria-label="目标固件版本">
            <option>${state.packageType === "diff" ? "23.422.209.17（差分包生成成功）" : "23.422.209.17（已上架）"}</option>
            <option>23.110.105.46</option>
            <option>10.176.46</option>
          </select>
          <em class="field-help">已是目标版本的设备不会进入升级范围。</em>
        </label>
        <label class="field-stack">
          <span><span class="required">*</span> 任务起止时间</span>
          <div class="date-inputs">
            <input value="2026-06-03 09:00:00" aria-label="开始日期时间" />
            <span>至</span>
            <input value="2026-06-06 18:00:00" aria-label="结束日期时间" />
          </div>
          <em class="field-help">任务周期不超过 90 天。</em>
        </label>
        <label class="field-stack wide-field">
          <span><span class="required">*</span> 任务升级说明</span>
          <textarea class="textarea compact-textarea" placeholder="请输入升级目标、影响范围、灰度或回滚关注点。" aria-label="任务升级说明">修复低功耗设备夜间唤醒异常，按杭州低功耗大区灰度发布。</textarea>
        </label>
      </div>
    </section>
  `;
}

function renderRegionDropdown() {
  const options = [
    ["中国 / 杭州低功耗", true],
    ["中国 / 杭州", true],
    ["中国 / 深圳", false],
    ["中国 / 成都", false],
    ["中国 / 上海", false],
  ];
  return `
    <div class="select-dropdown" data-stop>
      ${options.map(([label, checked]) => `
        <label class="select-option">
          <input type="checkbox" ${checked ? "checked" : ""} />
          <span>${label}</span>
        </label>
      `).join("")}
    </div>
  `;
}

function renderStrategyStep() {
  const packageLabel = state.packageType === "whole" ? "整包" : "差分包";
  const meta = strategyMeta[state.strategy];
  return `
    <section class="workbench-card step-card">
      <div class="card-heading">
        <div>
          <span class="eyebrow">Step 2</span>
          <h3>配置升级策略</h3>
        </div>
        <span class="mini-tag ${state.strategy === "manual" ? "green" : "blue"}">${meta.approval}</span>
      </div>
      <div class="package-panel">
        <div>
          <span class="field-caption"><span class="required">*</span> 升级包类型</span>
          <div class="radio-group" role="radiogroup" aria-label="升级包">
            ${radio("packageType", "whole", "整包", state.packageType)}
            ${radio("packageType", "diff", "差分包", state.packageType)}
          </div>
        </div>
        <div class="package-note ${state.packageType === "diff" ? "warn" : ""}">
          ${icon(state.packageType === "diff" ? "alert" : "info")}
          <span>${state.packageType === "diff"
            ? "差分包仅支持 4G 模组，预检会校验源版本是否存在可用差分包。"
            : "整包适用于常规升级和跨版本升级。"}</span>
        </div>
      </div>
      ${renderPackageGate()}
      <div class="section-divider"></div>
      <span class="field-caption"><span class="required">*</span> 升级策略</span>
      <div class="strategy-grid">
        ${strategyCard("version", "指定版本号升级", "按当前指定版本批量升级到目标版本，支持区域筛选")}
        ${strategyCard("file", "文件导入升级", "上传 CSV / Excel 设备清单，适合批量定向升级")}
        ${strategyCard("manual", "手动导入升级", "最多 10 台，适合灰度测试或单台处理")}
      </div>
      ${renderStrategyBody(packageLabel)}
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
        <span class="mini-tag ${previewData().disabled ? "orange" : "green"}">${previewData().disabled ? "不可发布" : "可继续"}</span>
      </div>
      ${renderPreviewContent(false)}
    </section>
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
      </div>
      <div class="finish-panel">
        ${icon("check")}
        <div>
          <strong>${state.strategy === "manual" ? "发布成功，任务已进入待执行" : "任务已提交，等待产线负责人审批"}</strong>
          <p>任务创建完成后可在任务列表和审批日志中追踪状态。</p>
        </div>
      </div>
    </section>
  `;
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
        : `${state.previewScenario !== "clean" ? `<button class="btn" type="button" data-action="download-exception">${icon("download")}下载异常明细</button>` : ""}${renderPublishButton()}`}
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

function strategyCard(value, title, desc) {
  const meta = strategyMeta[value];
  return `
    <button class="strategy-card ${state.strategy === value ? "active" : ""}" type="button" data-strategy="${value}">
      <strong>${title}</strong>
      <span>${desc}</span>
      <em>${meta.approval}</em>
    </button>
  `;
}

function renderStrategyBody(packageLabel) {
  if (state.strategy === "file") return renderFileStrategy(packageLabel);
  if (state.strategy === "manual") return renderManualStrategy(packageLabel);
  return renderVersionStrategy(packageLabel);
}

function renderVersionStrategy(packageLabel) {
  return `
    ${renderStrategyNote(packageLabel)}
    <div class="rule-panel">
      <div class="rule-header">
        <span class="field-caption">版本升级规则</span>
        <span class="mini-tag">统一使用版本表格选择</span>
      </div>
      <div class="segmented" role="radiogroup" aria-label="版本过滤规则">
        ${radio("versionRule", "all", "全部版本升级", state.versionRule)}
        ${radio("versionRule", "include", "仅指定版本升级", state.versionRule)}
        ${radio("versionRule", "exclude", "排除指定版本不升级", state.versionRule)}
      </div>
      <div class="info-strip">${icon("info")} ${versionRuleDescription()}</div>
      <div class="quantity-panel">
        <span class="field-caption">配置升级数量</span>
        <div class="segmented compact-segmented" role="radiogroup" aria-label="升级数量">
          ${radio("quantityMode", "full", "全量", state.quantityMode)}
          ${radio("quantityMode", "batch", "批量", state.quantityMode)}
        </div>
        <span class="text-muted">${state.quantityMode === "full" ? "全量模式按表格选中版本自动加载全部可升级设备。" : "批量模式可在表格里配置每个版本的指定下发设备数量。"}</span>
      </div>
      <div class="version-table">
        <table>
          <thead><tr><th style="width: 190px">${state.versionRule === "exclude" ? "排除版本" : "选择版本"}</th><th>可升级设备</th><th>下发数量</th><th>策略结果</th><th>说明</th><th>操作</th></tr></thead>
          <tbody>${renderVersionRows()}</tbody>
        </table>
      </div>
      ${renderStrategyConditions()}
    </div>
  `;
}

function renderFileStrategy(packageLabel) {
  return `
    ${renderStrategyNote(packageLabel)}
    <div class="import-layout">
      <button class="upload-box" type="button" data-action="mock-upload">
        ${icon("upload")}
        <strong>点击或拖拽上传设备清单</strong>
        <span>下载设备导入模板，按要求填写设备 ID 后上传；一次最多入库 20,000 个设备。</span>
      </button>
      <div class="file-rules">
        <strong>文件校验规则</strong>
        <span>第一列为设备标识，首行表头自动跳过</span>
        <span>自动去重、跳过空行、清理首尾空格</span>
        <span>自动过滤重复设备 ID 号</span>
        <div class="inline-actions left">
          <button class="btn" type="button" data-action="download-template">${icon("download")}CSV 模板</button>
          <button class="btn" type="button" data-action="download-template">${icon("download")}Excel 模板</button>
        </div>
      </div>
    </div>
    <div class="version-table">
      <table>
        <thead><tr><th>文件名称</th><th>导入设备总数</th><th>重复过滤</th><th>校验状态</th><th>操作</th></tr></thead>
        <tbody><tr><td>IPC_杭州低功耗_设备导入.xlsx</td><td>1,250</td><td>18</td><td>${statusTag("可升级")} 1,248 台可发布</td><td><button class="link-btn" type="button" data-action="mock-upload">重新上传</button></td></tr></tbody>
      </table>
    </div>
    ${renderImportOwnershipPanel()}
  `;
}

function renderManualStrategy(packageLabel) {
  return `
    ${renderStrategyNote(packageLabel)}
    <div class="manual-toolbar">
      <label class="field-control search">
        ${icon("plus")}
        <input placeholder="输入设备ID后回车添加，最多10台" aria-label="手动输入设备ID" />
      </label>
      <button class="btn primary" type="button" data-action="validate-manual">${icon("check")}批量校验</button>
    </div>
    <div class="version-table">
      <table>
        <thead><tr><th>设备ID</th><th>源固件版本号</th><th>所属大区</th><th>校验状态</th><th>异常说明</th><th>操作</th></tr></thead>
        <tbody>
          <tr><td>VQDG2122086ZPUF</td><td>23.110.105.46</td><td>中国 / 杭州低功耗</td><td>${statusTag("可升级")}</td><td>-</td><td><button class="link-btn" data-action="remove-device">删减</button></td></tr>
          <tr><td>VQDG2122132LYVU</td><td>23.110.105.43</td><td>中国 / 杭州低功耗</td><td>${statusTag("可升级")}</td><td>-</td><td><button class="link-btn" data-action="remove-device">删减</button></td></tr>
          <tr><td>VQDG2122182RUJZ</td><td>23.422.209.17</td><td>中国 / 杭州</td><td>${statusTag("不可升级")}</td><td>已是目标版本</td><td><button class="link-btn" data-action="remove-device">删减</button></td></tr>
        </tbody>
      </table>
    </div>
    <div class="preview-line">
      <span class="chip">${icon("check")} 已添加 3 台${packageLabel}设备</span>
      <span class="chip">${icon("info")} 手动导入无需审批，发布后进入待执行</span>
      <span class="chip">${icon("alert")} 超过 10 台需改用文件导入并进入审批</span>
    </div>
    ${renderImportOwnershipPanel()}
  `;
}

function renderPackageGate() {
  if (state.packageType === "diff") {
    return `
      <div class="gate-list warn">
        <div>${icon("alert")} 差分包校验要求</div>
        <span>4G 模组</span>
        <span>基线版本匹配</span>
        <span>差分包生成成功</span>
      </div>
    `;
  }
  return `
    <div class="gate-list">
      <div>${icon("check")} 整包校验要求</div>
      <span>目标固件已上架</span>
      <span>机型兼容</span>
      <span>源版本低于目标版本</span>
    </div>
  `;
}

function renderVersionRows() {
  return firmwareVersions.map(item => {
    const disabled = state.packageType === "diff" && !item.diffReady;
    const selected = state.versionRule === "all" ? !disabled : item.diffReady || item.count > 1000;
    const result = state.versionRule === "exclude" && selected ? "本版本不升级" : disabled ? "不可升级" : "纳入升级";
    return `
      <tr class="${disabled ? "muted-row" : ""}">
        <td>
          <label class="table-check">
            <input type="checkbox" ${selected ? "checked" : ""} ${disabled || state.versionRule === "all" ? "disabled" : ""} />
            <span>${item.version}</span>
          </label>
        </td>
        <td>${item.count.toLocaleString()} 台</td>
        <td>${state.quantityMode === "batch" && !disabled ? `<input class="table-input" value="${Math.min(item.count, 500)}" aria-label="${item.version} 下发数量" />` : "全量"}</td>
        <td>${statusTag(result)}</td>
        <td>${item.note}</td>
        <td>${state.versionRule === "all" ? `<span class="text-muted">自动加载</span>` : `<button class="link-btn" type="button" data-action="remove-version">删减</button>`}</td>
      </tr>
    `;
  }).join("");
}

function versionRuleDescription() {
  if (state.versionRule === "include") {
    return "适用于问题修复 / 灰度验证，仅升级表格中勾选的固件版本号。";
  }
  if (state.versionRule === "exclude") {
    return "适用于大规模发布但需避开风险固件版本，表格中勾选版本将不会升级。";
  }
  return "适用于正式发版 / 安全补丁，全量覆盖所有符合目标版本升级的固件版本号设备。";
}

function renderStrategyConditions() {
  return `
    <div class="condition-panel">
      <div class="rule-header">
        <span class="field-caption">策略条件（非必填）</span>
        <span class="mini-tag">支持多选</span>
      </div>
      <label class="checkbox-line"><input type="checkbox" checked /> 指定地区</label>
      <div class="condition-tags">
        <span class="chip">${icon("check")} 中国 / 杭州低功耗</span>
        <span class="chip">${icon("check")} 中国 / 杭州</span>
        <button class="btn" type="button" data-action="open-region">选择地区</button>
      </div>
    </div>
  `;
}

function renderImportOwnershipPanel() {
  return `
    <div class="condition-panel ownership-panel">
      <div class="rule-header">
        <span class="field-caption">设备归属与地区条件</span>
        <span class="mini-tag blue">系统自动识别</span>
      </div>
      <div class="ownership-grid">
        <div>
          <strong>设备归属</strong>
          <p>导入后系统自动识别设备所属区域；不需要手动选择集群或节点。</p>
        </div>
        <div>
          <strong>地区过滤</strong>
          <p>可按地区进一步筛选目标设备；不属于当前大区的设备会在预检中剔除。</p>
        </div>
      </div>
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
  return `
    <section class="page">
      ${renderPageHeader("任务详情", {
        back: "task-list",
        actions: `<button class="btn danger" type="button" data-action="end-task">结束任务</button>`,
      })}
      <div class="detail-hero">
        <div class="detail-title">所有id综合导入 ${statusTag("升级中")}</div>
        <dl class="detail-item"><dt>目标固件版本:</dt><dd>23.422.209.17</dd></dl>
        <dl class="detail-item"><dt>创建时间:</dt><dd>2026-05-13 11:22:42</dd></dl>
        <dl class="detail-item"><dt>升级策略:</dt><dd>文件导入 <button class="link-btn" data-action="show-strategy">详情</button></dd></dl>
        <dl class="detail-item"><dt>升级时间:</dt><dd>2026-05-13 11:25:20</dd></dl>
        <dl class="detail-item"><dt>升级说明:</dt><dd>-</dd></dl>
        <dl class="detail-item"><dt>审批信息:</dt><dd>2026-05-13 11:22:46 江锐 提交至 钱江涛【审批通过】</dd></dl>
        <dl class="detail-item"><dt>备注:</dt><dd>-</dd></dl>
      </div>
      <h3 class="section-title">数据概览</h3>
      <div class="metrics-row">
        <div class="metric-card">
          <div>
            <strong>升级设备总数</strong>
            <p class="metric-value">6,505</p>
          </div>
          <div class="metric-illustration" aria-hidden="true"></div>
        </div>
        <div class="metric-card donut-zone">
          <div class="donut-metric">
            <div>
              <div class="dot-label metric-green"><span class="dot"></span>升级成功</div>
              <p class="metric-value metric-green">401</p>
            </div>
            <div class="donut" style="--value: 22deg; --color: #20c96a" data-label="6%"></div>
          </div>
          <span class="divider-vertical"></span>
          <div class="donut-metric">
            <div>
              <div class="dot-label metric-red"><span class="dot"></span>升级失败</div>
              <p class="metric-value metric-red">0</p>
            </div>
            <div class="donut" style="--value: 5deg; --color: #f05261" data-label="0%"></div>
          </div>
        </div>
      </div>
      <div class="toolbar" style="margin-top: 28px">
        <label class="field-control search">
          ${icon("search")}
          <input placeholder="请输入设备ID,按Enter搜索" aria-label="设备ID搜索" />
        </label>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>设备ID</th><th>完成时间</th><th>耗时</th><th>升级进度</th><th>升级状态 ${icon("chevron")}</th><th>原因</th></tr></thead>
          <tbody>${deviceRows.map(id => `<tr><td>${id}</td><td>-</td><td>-</td><td>0%</td><td>待升级</td><td>-</td></tr>`).join("")}</tbody>
        </table>
      </div>
    </section>
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

function pagination(total, pages) {
  return `
    <div class="pagination" aria-label="分页">
      <span>共 ${total} 条</span>
      <button class="page-size" type="button">20条/页 ${icon("chevron")}</button>
      <button class="page-btn" type="button" aria-label="上一页" disabled>‹</button>
      ${Array.from({ length: Math.min(pages, 7) }, (_, i) => `<button class="page-btn ${i === 0 ? "active" : ""}" type="button">${i + 1}</button>`).join("")}
      <button class="page-btn" type="button" aria-label="下一页">›</button>
      <span>前往</span>
      <input class="page-input" value="1" aria-label="页码" />
      <span>页</span>
    </div>
  `;
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
          <div class="toolbar" style="margin-bottom: 14px">
            <span class="text-muted">异常场景切换：</span>
            <button class="chip" data-preview="mixed">存在可升级+异常</button>
            <button class="chip" data-preview="blocked">可升级为0</button>
            <button class="chip" data-preview="clean">无异常</button>
          </div>
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
  const diffPenalty = state.packageType === "diff" && state.strategy !== "manual" ? 418 : 0;
  const scenario = {
    mixed: { bad: Math.max(meta.bad + diffPenalty, 2), good: Math.max(meta.good - diffPenalty, 1), alertClass: "warn", alertTitle: "检测到部分设备不符合发布条件", alertText: "可过滤异常设备后继续发布可升级设备", action: state.strategy === "manual" ? "过滤异常并发布" : "过滤异常并提交审批", disabled: false },
    blocked: { bad: meta.devices, good: 0, alertClass: "error", alertTitle: "无法发布OTA升级任务", alertText: "不存在可升级设备，不支持发布任务", action: "无法发布", disabled: true },
    clean: { bad: 0, good: meta.devices, alertClass: "success", alertTitle: "预检通过", alertText: state.strategy === "manual" ? "全部设备可升级，可正常发布" : "全部设备可升级，发布后需走审批流程", action: state.strategy === "manual" ? "立即发布" : "提交审批", disabled: false },
  }[state.previewScenario];
  return { ...scenario, total: meta.devices };
}

function renderPreviewContent(compact) {
  const meta = strategyMeta[state.strategy];
  const data = previewData();
  const exceptions = state.previewScenario !== "clean";
  return `
    <div class="preview-alert ${data.alertClass}">
      ${icon(data.alertClass === "success" ? "check" : "alert")}
      <div><strong>${data.alertTitle}</strong><br /><span>${data.alertText}</span></div>
    </div>
    <div class="release-route">
      <div>
        <span>发布后状态</span>
        <strong>${state.strategy === "manual" ? "待执行" : "待审批"}</strong>
      </div>
      <div>
        <span>目标设备</span>
        <strong>${meta.centerTargets.toLocaleString()} 台</strong>
      </div>
      <div>
        <span>已过滤设备</span>
        <strong>${meta.filteredOut.toLocaleString()} 台</strong>
      </div>
      <div>
        <span>待确认归属</span>
        <strong>${meta.candidates.toLocaleString()} 台</strong>
      </div>
    </div>
    <div class="preview-layout ${compact ? "compact" : ""}">
      <div class="modal-section">
        <h3>基本信息</h3>
        <div class="info-grid">
          <dl>
            <dt>任务名称：</dt><dd>IPC-杭州低功耗_安全补丁升级</dd>
            <dt>目标固件版本：</dt><dd><button class="link-btn">23.422.209.17</button></dd>
            <dt>任务执行大区：</dt><dd><span class="mini-tag blue">中国 / 杭州低功耗</span><span class="mini-tag blue">中国 / 杭州</span></dd>
            <dt>任务起止时间：</dt><dd>2026-06-03 09:00:00 ~ 2026-06-06 18:00:00</dd>
            <dt>升级说明：</dt><dd>修复低功耗设备夜间唤醒异常，按杭州低功耗大区灰度发布。</dd>
          </dl>
        </div>
      </div>
      <div class="modal-section">
        <h3>升级策略</h3>
        <div class="info-grid">
          <dl>
            <dt>升级包：</dt><dd><span class="mini-tag blue">${state.packageType === "whole" ? "整包" : "差分包"}</span></dd>
            <dt>升级策略：</dt><dd>${meta.title}</dd>
            <dt>版本规则：</dt><dd>${state.strategy === "version" ? ({ all: "全部版本升级", include: "仅指定版本升级", exclude: "排除指定版本不升级" }[state.versionRule]) : "-"}</dd>
            <dt>升级数量：</dt><dd>${state.quantityMode === "full" ? "全量" : "批量"}</dd>
            <dt>审批流程：</dt><dd>${state.strategy === "manual" ? "无需审批" : "需产线负责人审批"}</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="modal-section">
      <h3>任务预览</h3>
      <div class="preview-cards">
        <div class="preview-card blue"><span>选定设备总数</span><strong>${data.total}</strong></div>
        <div class="preview-card green"><span>可升级设备数</span><strong>${data.good}</strong></div>
        <div class="preview-card orange"><span>不可升级设备数</span><strong>${data.bad}</strong></div>
      </div>
    </div>
    <div class="modal-section">
      <h3>发布校验闭环</h3>
      <div class="publish-checks">
        <span class="validation-item pass">${icon("check")} 执行周期合规</span>
        <span class="validation-item pass">${icon("check")} 升级数量合规</span>
        <span class="validation-item pass">${icon("check")} 设备无并发升级冲突</span>
        <span class="validation-item ${state.packageType === "diff" ? "warn" : "pass"}">${icon(state.packageType === "diff" ? "alert" : "check")} ${state.packageType === "diff" ? "差分包需继续校验" : "整包兼容性通过"}</span>
      </div>
    </div>
    ${exceptions ? `
      <div class="modal-section">
        <h3 style="border-left-color: var(--orange); color: var(--orange)">异常分类明细</h3>
        <div class="exception-list">
          <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>已是目标版本：设备当前版本与目标固件版本一致</span><span class="mini-tag">${state.previewScenario === "blocked" ? Math.ceil(data.bad * 0.42) : Math.min(data.bad, 2)}台</span></div>
          <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>${state.packageType === "diff" ? "无可用差分包：源版本未匹配差分基线" : "设备不在任务执行大区或机型不匹配"}</span><span class="mini-tag">${state.previewScenario === "blocked" ? Math.floor(data.bad * 0.58) : Math.max(data.bad - 2, 0)}台</span></div>
        </div>
        <div class="suggestion">${icon("info")} 建议下载异常明细排查；存在部分可升级时，可过滤异常设备后继续发布。</div>
        <button class="btn" type="button" data-action="download-exception" style="margin-top: 12px">${icon("download")}下载异常文件明细</button>
      </div>
    ` : ""}
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
        <header class="modal-header"><span id="regionTitle">选择当前中心可管理区域</span><button class="modal-close" data-action="close-modal">${icon("close")}</button></header>
        <div class="modal-body">
          <div class="split-shell" style="grid-template-columns: 180px 1fr; min-height: 260px">
            <div class="role-sidebar">
              <button class="role-row active">中国大区中心</button>
              <button class="role-row" disabled>亚洲大区</button>
              <button class="role-row" disabled>北美大区</button>
              <button class="role-row" disabled>欧洲大区</button>
            </div>
            <div class="role-content" style="padding: 20px">
              ${["杭州", "杭州低功耗", "深圳", "成都", "上海"].map((item, index) => `
                <button class="role-row ${index === 1 ? "active" : ""}" data-action="choose-region">${index === 1 ? "✓ " : ""}${item}</button>
              `).join("")}
              <div class="suggestion">${icon("info")} 当前中心只允许选择中国大区下区域；跨大区任务需在对应中心新建。</div>
            </div>
          </div>
        </div>
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
            ${["全部", "待执行", "升级中", "已完成", "已结束", "待发布", "等待", "已驳回", "已失效"].map(label => `<button class="chip" data-action="choose-status">${label}</button>`).join("")}
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
      event.preventDefault();
      handleAction(action, el);
    });
  });

  root.querySelectorAll("[data-stop]").forEach(el => {
    el.addEventListener("click", event => event.stopPropagation());
  });

  root.querySelectorAll("[data-radio='packageType']").forEach(input => {
    input.addEventListener("change", () => {
      state.packageType = input.value;
      render();
    });
  });

  root.querySelectorAll("[data-radio='versionRule']").forEach(input => {
    input.addEventListener("change", () => {
      state.versionRule = input.value;
      render();
    });
  });

  root.querySelectorAll("[data-radio='quantityMode']").forEach(input => {
    input.addEventListener("change", () => {
      state.quantityMode = input.value;
      render();
    });
  });

  root.querySelectorAll("[data-strategy]").forEach(el => {
    el.addEventListener("click", () => {
      state.strategy = el.dataset.strategy;
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
      render();
      break;
    case "open-status-filter":
      openModal("status");
      break;
    case "open-preview":
      state.createStep = 3;
      render();
      break;
    case "close-modal":
      closeModal();
      break;
    case "save-task":
      showToast("任务草稿已保存");
      break;
    case "publish-task":
      closeModal();
      state.createStep = 4;
      showToast(state.strategy === "manual" ? "发布成功，任务已进入待执行" : "任务已提交，等待产线负责人审批");
      render();
      break;
    case "next-create-step":
      state.regionDropdownOpen = false;
      state.createStep = Math.min(state.createStep + 1, 4);
      render();
      break;
    case "prev-create-step":
      state.regionDropdownOpen = false;
      state.createStep = Math.max(state.createStep - 1, 1);
      render();
      break;
    case "cancel-create":
      state.route = "task-list";
      state.createStep = 1;
      render();
      break;
    case "mock-upload":
      showToast("已读取导入文件，发现 1250 台设备");
      break;
    case "download-template":
      showToast("设备导入模板已生成");
      break;
    case "validate-manual":
      showToast("校验完成：2 台设备可升级，1 台异常");
      break;
    case "remove-version":
      showToast("版本已从当前策略中删减");
      break;
    case "remove-device":
      showToast("设备已从手动导入列表删减");
      break;
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
      showToast("筛选条件已应用");
      break;
    case "reset":
      showToast("筛选条件已重置");
      break;
    case "choose-region":
      closeModal();
      showToast("当前大区已切换");
      break;
    case "choose-status":
      closeModal();
      showToast("任务状态筛选已更新");
      break;
    case "save-user-permission":
      showToast("用户权限已保存");
      state.route = "user-list";
      render();
      break;
    case "save-role-permission":
      showToast("角色权限已保存");
      state.route = "role-list";
      render();
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
