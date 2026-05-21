const state = {
  route: "task-list",
  packageType: "whole",
  strategy: "version",
  previewScenario: "mixed",
  modal: null,
  toast: "",
  navCollapsed: {
    ota: false,
    logs: false,
    users: false,
  },
  role: "系统管理员",
  roleTab: "permissions",
  referenceOpen: false,
};

const screenshotMap = {
  "task-list": "13077f73760af84554a538d6e51ad8631ec735530c5e8f2b8281fe7a127e20e7.png",
  "create-whole-version": "ac40399862e3f295ee35e3ade5e6c159807e64f1f29e3f4d110c3c4ec43067d4.png",
  "create-whole-file": "7da89a3826c6d77682c2c6852e57ac15026b37c581872adee39687000c3377bd.png",
  "create-whole-manual": "ba5dfce7445ac50bb31b3e3c5bca63524a8db4fd780bc7d8ec54931fdde5156f.png",
  "create-diff-version": "a3353c22761671796f42e9b8a677fd17d8247b1ce39852629c4e4d495bc5e696.png",
  "create-diff-file": "a9abd181512bc270678ae70fbfd3257192f9e0a2b2a0fb3874d1fdfbcc0a073c.png",
  "create-diff-manual": "6b975ef3723271304a822ef960c8cda92b4e8afcb9b818d592f9b5160dc57238.png",
  "preview-mixed": "aa1f3e8b3ee58ddd150b3c90d2bdd284a7e204726990e49264696977ed5e037f.png",
  "preview-blocked": "93109343fb71ea923b50db9c3bf9e0ed1c1e9ad0d208ab41709df48bd7bc4e60.png",
  "preview-clean": "11831bfedde1f4d3b17a0aad99c218760c5130e6659ec906559d1a822b2d79bd.png",
  "task-detail": "d073bebfb9b66214c129b0853b8d6635bac6b75feb57018504a30c549391c37b.png",
  "operation-log": "6040356bbb4774cec11b6941179829611c9f6ed6e00d5f3c4650ef311a0caf81.png",
  "approval-log": "8ae05c6e77057bf05a9b3455655569a1d3ce0d4bbc2a49359a015d023264a181.png",
  "user-list": "94542075f64a36c0a86cfa144fc16a0f5de8845b0dee7fbcf214a5fe1f501068.png",
  "user-permission": "93866f0c63842d4afaea33c8434107dfcfe97bfb31b3ad283a02b3e7bee71a29.png",
  "role-list": "fce85050eb5c37461b51d14b377295fb68ebfb9c5deed034af78eb6c6fc69f12.png",
  "role-create": "c24134ba7284b3deb0222f1e0065e9504662cb1787edd1cd22dd9565d98d8c28.png",
  "role-permission": "e8be1f7714e6a324f8a3077aa07311441c83b39fa3237111954d7c52f936616b.png",
};

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

const routeTitles = {
  "task-list": "任务列表",
  "task-detail": "任务详情",
  "create-task": "新增任务",
  "operation-log": "操作日志",
  "approval-log": "审批日志",
  "user-list": "用户列表",
  "user-permission": "用户列表-配置权限",
  "user-detail": "用户列表-详情",
  "role-list": "角色权限",
  "role-permission": "配置权限页面",
};

function icon(name, className = "") {
  return `<svg class="icon ${className}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
}

function setRoute(route) {
  state.route = route;
  state.referenceOpen = false;
  if (route === "create-task") syncCreateRoute();
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

function createKey() {
  return `create-${state.packageType}-${state.strategy}`;
}

function setCreateMode(packageType, strategy) {
  state.packageType = packageType;
  state.strategy = strategy;
  state.route = "create-task";
  state.referenceOpen = false;
  render();
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
      ${navSection("ota", "OTA升级", "home", [
        ["task-list", "任务列表"],
        ["create-task", "新增任务"],
        ["task-detail", "任务详情页"],
      ], active)}
      ${navSection("logs", "日志管理", "log", [
        ["operation-log", "操作日志"],
        ["approval-log", "审批日志"],
      ], active)}
      ${navSection("users", "用户角色", "users", [
        ["user-list", "用户列表"],
        ["user-permission", "用户列表-配置权限"],
        ["user-detail", "用户列表-详情"],
        ["role-list", "角色权限"],
        ["role-permission", "配置权限页面"],
      ], active)}
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
      return renderLogPage("操作日志", operationLogs, "operation-log");
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
    <div class="page-header">
      <div class="title-stack">
        ${back}
        <h2 class="page-title">${title}</h2>
      </div>
      <div>${actions}</div>
    </div>
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
      ${renderReference("task-list")}
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
  }[status] || "gray";
  return `<span class="status-tag ${cls}">${status}</span>`;
}

function renderCreateTask() {
  const packageLabel = state.packageType === "whole" ? "整包" : "差分包";
  return `
    <section class="page form-page">
      ${renderPageHeader("新增任务", { back: "task-list" })}
      <div class="form-shell">
        <div class="form-row">
          <label class="form-label">任务所属大区</label>
          <input class="input" value="中国/杭州低功耗" disabled />
        </div>
        <div class="form-row">
          <label class="form-label"><span class="required">*</span> 任务名称</label>
          <div class="input-with-count">
            <input class="input" placeholder="例如：华南区_IPC_1.1.1升级" aria-label="任务名称" />
            <span class="count">0 / 64</span>
          </div>
        </div>
        <div class="form-row">
          <label class="form-label"><span class="required">*</span> 目标固件版本</label>
          <input class="input" placeholder="请输入选择指定的目标固件版本号" aria-label="目标固件版本" />
        </div>
        <div class="form-row">
          <span class="form-label">升级包</span>
          <div class="radio-group" role="radiogroup" aria-label="升级包">
            ${radio("packageType", "whole", "整包", state.packageType)}
            ${radio("packageType", "diff", "差分包", state.packageType)}
          </div>
        </div>
        <div class="form-row wide">
          <span class="form-label"><span class="required">*</span> 升级策略</span>
          <div class="strategy-grid">
            ${strategyCard("version", "指定版本号升级", `按当前指定版本批量升级到目标版本，支持区域筛选`)}
            ${strategyCard("file", "文件导入升级", "通过文件批量导入设备ID进行升级")}
            ${strategyCard("manual", "手动导入升级", "手动输入少量设备ID，适用于小范围灰度测试")}
          </div>
        </div>
        ${renderStrategyBody(packageLabel)}
        <div class="form-row wide">
          <label class="form-label">升级说明</label>
          <textarea class="textarea" placeholder="请输入升级说明" aria-label="升级说明"></textarea>
        </div>
      </div>
      <div class="sticky-actions">
        <button class="btn" type="button" data-route="task-list">取消</button>
        <button class="btn" type="button" data-action="save-task">保存</button>
        <button class="btn primary" type="button" data-action="open-preview">预览并发布</button>
      </div>
      ${renderReference(createKey())}
    </section>
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
  return `
    <button class="strategy-card ${state.strategy === value ? "active" : ""}" type="button" data-strategy="${value}">
      <strong>${title}</strong>
      <span>${desc}</span>
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
    <div class="form-row">
      <span class="form-label">版本过滤规则</span>
      <div class="radio-group">
        ${radio("versionRule", "all", "全部升级", "all")}
        ${radio("versionRule", "include", "仅升级指定版本", "all")}
        ${radio("versionRule", "exclude", "排除指定版本", "all")}
      </div>
    </div>
    <div class="form-row wide">
      <span class="form-label"></span>
      <div class="info-strip">${icon("info")} 说明：适用于正式发版 / 安全补丁，全量覆盖所有符合目标版本升级的${packageLabel}设备。</div>
    </div>
    <div class="form-row">
      <label class="form-label"><span class="required">*</span> 升级数量规则</label>
      <div class="radio-group">
        <select class="select" aria-label="升级数量规则" style="width: 180px"><option>全量</option><option>批量</option></select>
        <span>升级数量：</span>
        <input class="input" value="全量" disabled style="width: 140px" />
      </div>
    </div>
    <div class="form-row wide">
      <span class="form-label"></span>
      <div class="version-table">
        <table>
          <thead><tr><th>可升级版本号</th><th>升级设备数</th></tr></thead>
        </table>
        <div class="empty-cell">暂无数据</div>
      </div>
    </div>
    ${renderConditions()}
  `;
}

function renderFileStrategy(packageLabel) {
  return `
    <div class="form-row wide">
      <span class="form-label"><span class="required">*</span> 设备文件</span>
      <button class="upload-box" type="button" data-action="mock-upload">
        ${icon("upload")}
        <strong>点击或拖拽上传设备ID文件</strong>
        <span>支持 .csv / .xlsx，系统会校验重复设备、版本和大区匹配情况，当前为${packageLabel}升级。</span>
      </button>
    </div>
    <div class="form-row">
      <label class="form-label"><span class="required">*</span> 升级数量规则</label>
      <div class="radio-group">
        <select class="select" aria-label="升级数量规则" style="width: 180px"><option>全量</option><option>批量</option></select>
        <span>升级数量：</span>
        <input class="input" placeholder="全量" style="width: 140px" />
      </div>
    </div>
    <div class="form-row wide">
      <span class="form-label">导入预览</span>
      <div class="version-table">
        <table>
          <thead><tr><th>文件名称</th><th>设备数量</th><th>校验状态</th></tr></thead>
          <tbody><tr><td>IPC_杭州低功耗_设备导入.xlsx</td><td>1250</td><td>${statusTag("待执行")}</td></tr></tbody>
        </table>
      </div>
    </div>
    ${renderConditions()}
  `;
}

function renderManualStrategy(packageLabel) {
  return `
    <div class="form-row wide">
      <label class="form-label"><span class="required">*</span> 设备ID</label>
      <textarea class="textarea manual-box" aria-label="设备ID" placeholder="请输入设备ID，每行一个。例如：
VQDG2122086ZPUF
VQDG2122132LYVU"></textarea>
    </div>
    <div class="form-row wide">
      <span class="form-label">设备预览</span>
      <div class="preview-line">
        <span class="chip">${icon("check")} 已识别 2 台${packageLabel}设备</span>
        <span class="chip">${icon("info")} 手动导入策略无需审批</span>
      </div>
    </div>
    ${renderConditions()}
  `;
}

function renderConditions() {
  return `
    <div class="form-row wide">
      <span class="form-label">策略条件</span>
      <div class="condition-grid">
        <label class="checkbox-line"><input type="checkbox" /> 指定地区</label>
        <select class="select"><option>请选择</option><option>中国</option><option>海外</option></select>
        <select class="select"><option>请选择地区</option><option>广东-深圳</option><option>四川-成都</option><option>上海（宠物）</option></select>
      </div>
    </div>
    <div class="form-row wide">
      <span class="form-label"></span>
      <div class="condition-grid">
        <label class="checkbox-line"><input type="checkbox" /> 指定经销商</label>
        <select class="select"><option>请选择</option><option>维拍物联</option><option>威视达康</option></select>
        <input class="input" placeholder="请输入经销商ID" />
      </div>
    </div>
    <div class="form-row">
      <label class="form-label"><span class="required">*</span> 升级起止时间</label>
      <div class="date-inputs">
        <input placeholder="开始日期时间" aria-label="开始日期时间" />
        <span>至</span>
        <input placeholder="结束日期时间" aria-label="结束日期时间" />
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
      ${renderReference("task-detail")}
    </section>
  `;
}

function renderLogPage(title, rows, shotKey) {
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
      ${renderReference(shotKey)}
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
      ${renderReference("approval-log")}
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
      ${renderReference("user-list")}
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
      ${renderReference("user-permission")}
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
      ${renderPageHeader(forcePermission ? "配置权限页面" : "角色权限")}
      <div class="split-shell">
        <aside class="role-sidebar">
          <h2>角色列表</h2>
          <button class="btn" type="button" data-action="open-role-create" style="width: 100%; margin-bottom: 20px">${icon("plus")}新增角色</button>
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
          <div class="tabs" role="tablist">
            <button class="tab-btn ${state.roleTab === "permissions" ? "active" : ""}" type="button" data-tab="permissions">角色权限</button>
            <button class="tab-btn ${state.roleTab === "users" ? "active" : ""}" type="button" data-tab="users">关联用户</button>
          </div>
          ${state.roleTab === "users" ? renderRoleUsers() : `<h3 class="section-title">角色权限</h3>${permissionTable(false)}`}
        </div>
      </div>
      ${renderReference(forcePermission ? "role-permission" : "role-list")}
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

function renderReference(key) {
  const shot = screenshotMap[key];
  if (!shot) return "";
  return `
    <div class="reference-panel">
      <button class="btn reference-toggle" type="button" data-action="toggle-reference">
        ${state.referenceOpen ? "收起" : "查看"}XMind截图参照
      </button>
      <div class="reference-shot ${state.referenceOpen ? "open" : ""}">
        <img src="./assets/screenshots/${shot}" alt="${key} 的 XMind 页面截图参照" loading="lazy" />
      </div>
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
  const data = {
    mixed: {
      alertClass: "warn",
      alertTitle: "发布预检提示",
      alertText: "检测到部分设备不符合发布条件",
      total: 1250,
      bad: 2,
      good: 2,
      action: "过滤异常并发布",
      disabled: false,
    },
    blocked: {
      alertClass: "error",
      alertTitle: "无法发布OTA任务",
      alertText: "未检测到可升级设备，当前任务无法发布",
      total: 1250,
      bad: 1250,
      good: 0,
      action: "过滤异常并发布",
      disabled: true,
    },
    clean: {
      alertClass: "success",
      alertTitle: "预检通过",
      alertText: "所有设备均符合发布条件",
      total: 1250,
      bad: 0,
      good: 1250,
      action: "立即发布",
      disabled: false,
    },
  }[state.previewScenario];
  const exceptions = state.previewScenario !== "clean";
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
          <div class="preview-alert ${data.alertClass}">
            ${icon(data.alertClass === "success" ? "check" : "alert")}
            <div><strong>${data.alertTitle}</strong><br /><span>${data.alertText}</span></div>
          </div>
          <div class="modal-section">
            <h3>基本信息</h3>
            <div class="info-grid">
              <dl>
                <dt>任务名称：</dt><dd>IPC-10.176.43指定版本全量升级至10.176.46</dd>
                <dt>目标固件版本：</dt><dd><button class="link-btn">10.176.46</button></dd>
                <dt>任务大区：</dt><dd><span class="mini-tag blue">中国/杭州</span></dd>
                <dt>升级说明：</dt><dd>这是一条OTA升级说明</dd>
              </dl>
            </div>
          </div>
          <div class="modal-section">
            <h3>升级策略</h3>
            <div class="info-grid">
              <dl>
                <dt>升级包：</dt><dd><span class="mini-tag blue">${state.packageType === "whole" ? "整包" : "差分包"}</span></dd>
                <dt>升级策略：</dt><dd>${state.strategy === "file" ? "文件导入升级" : state.strategy === "manual" ? "手动导入升级" : "指定版本号升级"}</dd>
                <dt>过滤固件版本：</dt><dd>【10.176.41】、【10.176.42】、【10.176.43】、【10.176.44】</dd>
                <dt>升级时间：</dt><dd>2026-04-10 00:00:00 ~ 2026-04-18 00:00:00</dd>
              </dl>
            </div>
          </div>
          <div class="modal-section">
            <h3>任务预览</h3>
            <div class="preview-cards">
              <div class="preview-card blue"><span>升级设备总数</span><strong>${data.total}</strong></div>
              <div class="preview-card orange"><span>不符合升级设备数</span><strong>${data.bad}</strong></div>
              <div class="preview-card green"><span>可升级设备数</span><strong>${data.good}</strong></div>
            </div>
          </div>
          ${exceptions ? `
            <div class="modal-section">
              <h3 style="border-left-color: var(--orange); color: var(--orange)">异常分类明细</h3>
              <div class="exception-list">
                <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>大区不匹配：设备位于其他群集，无法在此任务执行</span><span class="mini-tag">${state.previewScenario === "blocked" ? "780台" : "2台"}</span></div>
                <div class="exception-item"><span><span class="dot" style="display:inline-block;background:var(--orange);vertical-align:middle;margin-right:8px"></span>版本不支持：源版本过低或不满足目标升级版本范围</span><span class="mini-tag">${state.previewScenario === "blocked" ? "470台" : "1台"}</span></div>
              </div>
              <div class="suggestion">${icon("info")} 建议方案：点击【过滤异常并发布】将自动过滤上述不符合条件的设备，仅对剩余可升级设备执行。</div>
              <button class="btn" type="button" data-action="download-exception" style="margin-top: 12px">${icon("download")}下载异常明细</button>
            </div>
          ` : ""}
          ${renderReference(`preview-${state.previewScenario}`)}
        </div>
        <footer class="modal-footer">
          <button class="btn" data-action="close-modal">取消</button>
          <button class="btn primary" ${data.disabled ? "disabled title='无符合条件的设备，无法发布'" : ""} data-action="publish-task">${data.action}</button>
        </footer>
      </section>
    </div>
  `;
}

function renderRegionModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal medium" role="dialog" aria-modal="true" aria-labelledby="regionTitle" data-stop>
        <header class="modal-header"><span id="regionTitle">切换当前大区</span><button class="modal-close" data-action="close-modal">${icon("close")}</button></header>
        <div class="modal-body">
          <div class="split-shell" style="grid-template-columns: 180px 1fr; min-height: 260px">
            <div class="role-sidebar">
              <button class="role-row active">中国</button>
              <button class="role-row">香港</button>
              <button class="role-row">硅谷</button>
              <button class="role-row">全部</button>
            </div>
            <div class="role-content" style="padding: 20px">
              ${["杭州", "杭州低功耗", "深圳", "成都", "上海（宠物）"].map((item, index) => `
                <button class="role-row ${index === 1 ? "active" : ""}" data-action="choose-region">${index === 1 ? "✓ " : ""}${item}</button>
              `).join("")}
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
          ${renderReference("role-create")}
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

  root.querySelectorAll("[data-strategy]").forEach(el => {
    el.addEventListener("click", () => {
      state.strategy = el.dataset.strategy;
      state.referenceOpen = false;
      render();
    });
  });

  root.querySelectorAll("[data-preview]").forEach(el => {
    el.addEventListener("click", () => {
      state.previewScenario = el.dataset.preview;
      renderPortal();
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
    case "open-status-filter":
      openModal("status");
      break;
    case "open-preview":
      openModal("preview");
      break;
    case "close-modal":
      closeModal();
      break;
    case "save-task":
      showToast("任务草稿已保存");
      break;
    case "publish-task":
      closeModal();
      showToast(state.previewScenario === "clean" ? "发布成功" : "已过滤异常设备并提交发布");
      state.route = "task-list";
      render();
      break;
    case "mock-upload":
      showToast("已读取导入文件，发现 1250 台设备");
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
      break;
    case "show-strategy":
      openModal("strategyDetail");
      break;
    case "toggle-reference":
      state.referenceOpen = !state.referenceOpen;
      render();
      break;
    default:
      break;
  }
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && state.modal) closeModal();
});

render();
