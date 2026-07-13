const state = {
  fields: [],
  supervisors: [],
  universities: null,
  currentTags: [],
  recommendationScores: new Map(),
  lastRecommendationInput: null,
  page: 1,
  pageSize: 10,
  maxPublicationCount: 0,
  searchDebounceId: null,
  lang: localStorage.getItem("peis-lang") || "en"
};

const translations = {
  en: {
    pageTitle: "PEIS | PhD Education Intelligence System",
    brandName: "PhD Education Intelligence System",
    brandTagline: "Public supervisor-fit intelligence for education applicants",
    navFieldMap: "Field Map",
    navSupervisorDatabase: "Supervisor Database",
    navRecommendation: "AI Recommendation",
    heroTitle: "PhD Education Intelligence System",
    heroDescription:
      "PEIS helps applicants explore education research areas, manage verified supervisor records, and generate transparent fit recommendations without any backend, external API, or personal data storage.",
    metricFields: "Research Fields",
    metricSupervisors: "Verified Supervisors",
    metricStatic: "Static Frontend",
    moduleOne: "Module 1",
    moduleTwo: "Module 2",
    moduleThree: "Module 3",
    fieldMapTitle: "Research Field Map",
    fieldMapDescription: "Expand taxonomy branches to inspect subfields, methods, and application contexts.",
    expandAll: "Expand All",
    collapseAll: "Collapse All",
    databaseTitle: "Supervisor Database",
    databaseDescription: "Search, filter, sort, and page through verified supervisor records stored in JSON.",
    searchLabel: "Search supervisors",
    searchPlaceholder: "Name, keyword, university, or department",
    universityFilterLabel: "University",
    allUniversities: "All universities",
    fieldFilterLabel: "Research field",
    allFields: "All fields",
    methodFilterLabel: "Methodology",
    allMethods: "All methods",
    methodQualitative: "Qualitative",
    methodQuantitative: "Quantitative",
    methodMixed: "Mixed",
    regionFilterLabel: "Region",
    allRegions: "All regions",
    regionMainlandChina: "Mainland China",
    regionHongKong: "Hong Kong",
    regionGlobal: "Global",
    tierFilterLabel: "University tier",
    allTiers: "All tiers",
    tierMainlandChina: "Mainland China",
    tierHongKong: "Hong Kong",
    tierGlobal: "Global",
    tierUnknown: "Unknown",
    academicLevelFilterLabel: "Academic level",
    allAcademicLevels: "All levels",
    levelAssistant: "Assistant Professor",
    levelAssociate: "Associate Professor",
    levelProfessor: "Professor",
    levelChair: "Chair Professor",
    levelOther: "Other",
    publicationLevelFilterLabel: "Publication level",
    allPublicationLevels: "All activity levels",
    publicationHigh: "High activity",
    publicationMedium: "Medium activity",
    publicationEmerging: "Emerging",
    publicationUnverified: "Not verified",
    sortLabel: "Sort by",
    sortRelevance: "Relevance score",
    sortPublicationActivity: "Publication activity",
    sortUniversityTier: "University tier",
    resetFilters: "Reset filters",
    tableSupervisor: "Supervisor",
    tableResearchFit: "Research Fit",
    tableMethod: "Method",
    tableOutputs: "Outputs",
    tableStatus: "Status",
    pageSizeLabel: "Rows per page",
    prevPage: "Previous",
    nextPage: "Next",
    pageStatus: (page, total) => `Page ${page} of ${total}`,
    recommendationTitle: "AI Recommendation Engine",
    recommendationDescription: "Local rule-based scoring converts applicant input into tags and ranks top matches.",
    interestLabel: "Research interest",
    interestPlaceholder: "Example: AI-supported self-regulated learning, learning analytics, mixed-method higher education research",
    methodPreferenceLabel: "Methodology preference",
    regionPreferenceLabel: "Region preference",
    noPreference: "No preference",
    generateMatches: "Generate Top 5 Matches",
    structuredTags: "Structured Tags",
    tagsEmpty: "Enter research interests to generate tags.",
    topMatches: "Top Matches",
    matchesEmpty: "No verified supervisor records are available for matching yet.",
    projectInformationLabel: "Project Information",
    projectInformationTitle: "About This Project",
    projectInformationDescription:
      "This platform was created and is maintained by Tequila Sunset（龙舌兰日落） as an independent academic project. It aims to support Education PhD applicants by providing a structured supervisor database, research-field exploration tools and transparent matching functions. Data are compiled from official university sources and are periodically reviewed.",
    projectSocial: "Xiaohongshu: search 龙舌兰日落",
    footerAttribution:
      "Created and maintained by Tequila Sunset（龙舌兰日落）. An independent academic project supporting Education PhD applicants.",
    footerSocial: "Find me on Xiaohongshu by searching: 龙舌兰日落",
    footerNotice:
      "PEIS is a static academic intelligence system. Supervisor records must be verified against official university sources before publication.",
    homepage: "Personal homepage",
    departmentPage: "Department page",
    source: "Source",
    supervisorCount: (count) => `${count} verified supervisor${count === 1 ? "" : "s"}`,
    noSupervisorMatch:
      "No verified supervisors match the current filters. Add records through data/template_supervisor.json after source verification.",
    relevanceSuffix: "activity",
    tierSuffix: "tier",
    notVerified: "Not verified",
    unavailable: "Unavailable",
    scoreField: "Fields",
    scoreKeyword: "Keywords",
    scoreMethod: "Method",
    scoreEnvironment: "Environment",
    phdStatusUnknown: "PhD status not verified",
    researchOverlap: (fields) => `research field similarity with ${fields}`,
    keywordEvidence: "keyword similarity found in verified profile topics",
    methodExact: (method) => `${method} methodology matches preference`,
    methodPartial: (method, preference) => `${method} methodology is compatible with ${preference} preference`,
    environmentMatched: (region) => `${region} research environment matches preference`,
    environmentBaseline: "university and research environment signals included",
    baselineReason: "limited evidence; treat as an exploratory match until sources are reviewed",
    recommendedBecause: "Recommended because"
  },
  zh: {
    pageTitle: "PEIS | 博士教育申请情报系统",
    brandName: "博士教育申请情报系统",
    brandTagline: "面向教育学博士申请者的公共导师匹配情报工具",
    navFieldMap: "领域地图",
    navSupervisorDatabase: "导师数据库",
    navRecommendation: "AI 推荐",
    heroTitle: "博士教育申请情报系统",
    heroDescription:
      "PEIS 帮助申请者探索教育研究领域、维护已核验导师记录，并在无后端、无外部 API、无个人数据存储的前提下生成透明的匹配推荐。",
    metricFields: "研究领域",
    metricSupervisors: "已核验导师",
    metricStatic: "纯静态前端",
    moduleOne: "模块 1",
    moduleTwo: "模块 2",
    moduleThree: "模块 3",
    fieldMapTitle: "研究领域地图",
    fieldMapDescription: "展开分类层级，查看子领域、方法取向与应用场景。",
    expandAll: "全部展开",
    collapseAll: "全部收起",
    databaseTitle: "导师数据库",
    databaseDescription: "搜索、筛选、排序并分页浏览 JSON 中的已核验导师记录。",
    searchLabel: "搜索导师",
    searchPlaceholder: "姓名、关键词、大学或院系",
    universityFilterLabel: "大学",
    allUniversities: "全部大学",
    fieldFilterLabel: "研究领域",
    allFields: "全部领域",
    methodFilterLabel: "研究方法",
    allMethods: "全部方法",
    methodQualitative: "质性",
    methodQuantitative: "量化",
    methodMixed: "混合",
    regionFilterLabel: "地区",
    allRegions: "全部地区",
    regionMainlandChina: "中国内地",
    regionHongKong: "中国香港",
    regionGlobal: "全球",
    tierFilterLabel: "大学层级",
    allTiers: "全部层级",
    tierMainlandChina: "中国内地",
    tierHongKong: "中国香港",
    tierGlobal: "全球",
    tierUnknown: "未知",
    academicLevelFilterLabel: "学术职级",
    allAcademicLevels: "全部职级",
    levelAssistant: "助理教授",
    levelAssociate: "副教授",
    levelProfessor: "教授",
    levelChair: "讲席教授",
    levelOther: "其他",
    publicationLevelFilterLabel: "发表活跃度",
    allPublicationLevels: "全部活跃度",
    publicationHigh: "高活跃",
    publicationMedium: "中等活跃",
    publicationEmerging: "成长型",
    publicationUnverified: "未核验",
    sortLabel: "排序方式",
    sortRelevance: "相关度评分",
    sortPublicationActivity: "发表活跃度",
    sortUniversityTier: "大学层级",
    resetFilters: "重置筛选",
    tableSupervisor: "导师",
    tableResearchFit: "研究匹配",
    tableMethod: "方法",
    tableOutputs: "成果",
    tableStatus: "状态",
    pageSizeLabel: "每页数量",
    prevPage: "上一页",
    nextPage: "下一页",
    pageStatus: (page, total) => `第 ${page} / ${total} 页`,
    recommendationTitle: "AI 推荐引擎",
    recommendationDescription: "本地规则评分会把申请者输入转换为结构化标签，并排序推荐导师。",
    interestLabel: "研究兴趣",
    interestPlaceholder: "示例：AI 支持的自我调节学习、学习分析、混合方法、高等教育研究",
    methodPreferenceLabel: "方法偏好",
    regionPreferenceLabel: "地区偏好",
    noPreference: "无偏好",
    generateMatches: "生成前 5 位匹配导师",
    structuredTags: "结构化标签",
    tagsEmpty: "输入研究兴趣后生成标签。",
    topMatches: "最佳匹配",
    matchesEmpty: "目前还没有可用于匹配的已核验导师记录。",
    projectInformationLabel: "项目信息",
    projectInformationTitle: "关于本项目",
    projectInformationDescription:
      "本平台由 Tequila Sunset（龙舌兰日落）创建并维护，是一个独立的学术与教育技术项目。项目通过结构化导师数据库、研究领域探索工具和透明的匹配功能，为教育学博士申请者提供支持。数据整理自大学官方来源，并进行定期复核。",
    projectSocial: "小红书：搜索 龙舌兰日落",
    footerAttribution:
      "由 Tequila Sunset（龙舌兰日落）创建并维护。一个服务教育学博士申请者的独立学术项目。",
    footerSocial: "在小红书搜索：龙舌兰日落",
    footerNotice: "PEIS 是静态学术情报系统。导师记录发布前必须通过大学官方来源核验。",
    homepage: "个人主页",
    departmentPage: "院系页面",
    source: "来源",
    supervisorCount: (count) => `${count} 位已核验导师`,
    noSupervisorMatch: "当前筛选条件下没有已核验导师。请按 data/template_supervisor.json 核验来源后添加记录。",
    relevanceSuffix: "活跃度",
    tierSuffix: "层级",
    notVerified: "未核验",
    unavailable: "暂无",
    scoreField: "领域",
    scoreKeyword: "关键词",
    scoreMethod: "方法",
    scoreEnvironment: "环境",
    phdStatusUnknown: "博士招生状态未核验",
    researchOverlap: (fields) => `研究领域相似：${fields}`,
    keywordEvidence: "已核验主题中存在关键词相似性",
    methodExact: (method) => `${method}方法与偏好一致`,
    methodPartial: (method, preference) => `${method}方法与${preference}偏好兼容`,
    environmentMatched: (region) => `符合${region}研究环境偏好`,
    environmentBaseline: "已纳入大学与研究环境信号",
    baselineReason: "证据有限；在复核来源前仅作为探索性匹配",
    recommendedBecause: "推荐理由"
  }
};

const fieldAliases = {
  "AI in Education": ["ai", "artificial intelligence", "generative ai", "intelligent tutoring", "learning analytics", "adaptive learning", "human-ai", "人工智能", "教育人工智能", "生成式", "学习分析", "智能导师", "自我调节"],
  "Learning Sciences": ["learning sciences", "collaborative learning", "knowledge building", "design-based", "cognitive apprenticeship", "学习科学", "协作学习", "知识建构", "设计型研究"],
  "Educational Psychology": ["educational psychology", "motivation", "self-regulated", "self regulation", "academic emotions", "cognition", "教育心理", "动机", "自我调节", "学业情绪", "认知"],
  "Higher Education Studies": ["higher education", "doctoral education", "graduate education", "student success", "university governance", "高等教育", "博士教育", "研究生教育", "大学治理"],
  "Education Policy": ["policy", "governance", "equity", "accountability", "comparative education", "reform", "教育政策", "治理", "公平", "问责", "改革"],
  "Curriculum & Instruction": ["curriculum", "instruction", "pedagogy", "instructional design", "classroom", "stem education", "课程", "教学", "教学法", "课堂", "教学设计"],
  "Digital Education": ["digital", "online learning", "blended", "platform", "technology adoption", "edtech", "数字教育", "在线学习", "混合式", "教育技术", "平台"],
  "Sociology of Education": ["sociology", "inequality", "social mobility", "migration", "cultural capital", "stratification", "教育社会学", "不平等", "社会流动", "迁移", "文化资本"],
  "Assessment & Evaluation": ["assessment", "evaluation", "measurement", "validity", "formative", "learning outcomes", "测评", "评价", "测量", "形成性", "学习结果"],
  "Teacher Education": ["teacher", "professional learning", "teacher identity", "teacher agency", "mentoring", "教师教育", "教师", "专业学习", "教师身份", "教师能动性"],
  "Special Education": ["special education", "inclusive", "disability", "assistive", "accessibility", "universal design", "特殊教育", "融合教育", "残障", "辅助技术", "无障碍"],
  "Philosophy of Education": ["philosophy", "ethics", "democratic education", "critical pedagogy", "moral education", "epistemology", "教育哲学", "伦理", "民主教育", "批判教育学", "道德教育"]
};

const stopWords = new Set([
  "about", "across", "also", "and", "are", "based", "between", "for", "from", "how", "into",
  "learning", "method", "methods", "research", "study", "the", "their", "through", "with",
  "教育", "研究", "学习", "方法", "申请", "导师"
]);

const $ = (selector) => document.querySelector(selector);
const t = (key, ...args) => {
  const value = translations[state.lang][key] ?? translations.en[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
};
const normalize = (value) => String(value || "").trim().toLowerCase();
const asArray = (value) => (Array.isArray(value) ? value : []);
const escapeHTML = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);

const methodLabel = (method) => {
  const labels = {
    qualitative: t("methodQualitative"),
    quantitative: t("methodQuantitative"),
    mixed: t("methodMixed"),
    not_verified: t("notVerified")
  };
  return labels[method] || method || t("notVerified");
};

const regionLabel = (region) => {
  const labels = {
    "Mainland China": t("regionMainlandChina"),
    China: t("regionMainlandChina"),
    "Hong Kong": t("regionHongKong"),
    Global: t("regionGlobal")
  };
  return labels[region] || region || t("notVerified");
};

const fieldByName = (name) => state.fields.find((field) => field.name === name);
const fieldLabel = (name) => {
  const field = fieldByName(name);
  return state.lang === "zh" && field?.name_zh ? field.name_zh : name;
};

const tagLabel = (tag) => {
  if (fieldAliases[tag]) return fieldLabel(tag);
  if (["qualitative", "quantitative", "mixed"].includes(tag)) return methodLabel(tag);
  if (["Mainland China", "Hong Kong", "Global"].includes(tag)) return regionLabel(tag);
  return tag;
};

const getSupervisorRegion = (supervisor) => supervisor.region || (supervisor.country === "China" ? "Mainland China" : supervisor.country);
const getSupervisorId = (supervisor) => supervisor.supervisor_id || supervisor.id || supervisor.name || "";
const getHomepage = (supervisor) => supervisor.personal_homepage_url || supervisor.homepage_url || "";
const getDepartmentPage = (supervisor) => supervisor.department_homepage_url || supervisor.department_url || "";
const getStatus = (supervisor) => supervisor.phd_supervisor_status || supervisor.supervision_status || "";
const getPublicationCount = (supervisor) => Number(supervisor.publication_count) || 0;

const publicationActivity = (supervisor) => {
  const count = getPublicationCount(supervisor);
  if (!supervisor.publication_count && supervisor.publication_count !== 0) return "unverified";
  if (count >= 80) return "high";
  if (count >= 30) return "medium";
  return "emerging";
};

const publicationScore = (count) => {
  return state.maxPublicationCount ? count / state.maxPublicationCount : 0;
};

const tokenize = (text) => {
  const tokens = normalize(text).match(/[\p{Script=Han}a-z0-9-]+/gu) || [];
  return tokens.filter((token) => token.length > 1 && !stopWords.has(token));
};

const detectFieldTags = (text) => {
  const source = normalize(text);
  return Object.entries(fieldAliases)
    .filter(([field, aliases]) => source.includes(normalize(field)) || aliases.some((alias) => source.includes(normalize(alias))))
    .map(([field]) => field);
};

const extractStructuredTags = (text) => {
  const fieldTags = detectFieldTags(text);
  const keywordTags = [...new Set(tokenize(text))].slice(0, 12);
  return [...new Set([...fieldTags, ...keywordTags])];
};

const overlapRatio = (sourceItems, targetItems) => {
  if (!sourceItems.length) return 0;
  const target = new Set(asArray(targetItems).map(normalize));
  const matches = sourceItems.filter((item) => target.has(normalize(item))).length;
  return matches / sourceItems.length;
};

const buildSearchableSupervisorText = (supervisor) =>
  normalize(
    [
      supervisor.supervisor_id,
      supervisor.id,
      supervisor.name,
      supervisor.university,
      supervisor.faculty_school,
      supervisor.department,
      supervisor.academic_title,
      supervisor.country,
      getSupervisorRegion(supervisor),
      asArray(supervisor.research_fields).join(" "),
      asArray(supervisor.research_fields)
        .map((field) => {
          const fieldRecord = fieldByName(field);
          return [field, fieldRecord?.name_zh, fieldRecord?.description, fieldRecord?.description_zh].filter(Boolean).join(" ");
        })
        .join(" "),
      asArray(supervisor.keywords).join(" "),
      asArray(supervisor.major_research_projects).join(" ")
    ].join(" ")
  );

const searchableSupervisorText = (supervisor) => supervisor._searchableText || buildSearchableSupervisorText(supervisor);

const prepareSupervisorRecord = (supervisor) => ({
  ...supervisor,
  supervisor_id: getSupervisorId(supervisor),
  _publicationCount: getPublicationCount(supervisor),
  _searchableText: buildSearchableSupervisorText(supervisor)
});

const prepareSupervisorDataset = (items) => {
  state.supervisors = asArray(items).map(prepareSupervisorRecord);
  state.maxPublicationCount = Math.max(0, ...state.supervisors.map((supervisor) => supervisor._publicationCount));
};

const keywordMatchRatio = (tokens, supervisor) => {
  if (!tokens.length) return 0;
  const searchable = searchableSupervisorText(supervisor);
  const matches = tokens.filter((token) => searchable.includes(normalize(token))).length;
  return Math.min(matches / Math.max(tokens.length, 1), 1);
};

const methodologyScore = (preference, supervisorMethod) => {
  if (!["qualitative", "quantitative", "mixed"].includes(supervisorMethod)) return preference ? 0 : 0.25;
  if (!preference) return 0.5;
  if (preference === supervisorMethod) return 1;
  if (preference === "mixed" || supervisorMethod === "mixed") return 0.65;
  return 0;
};

const environmentScore = (regionPreference, supervisor) => {
  const tierScore = {
    Global: 1,
    "Hong Kong": 0.92,
    "Mainland China": 0.88,
    China: 0.88,
    Unknown: 0.45
  }[supervisor.university_tier] ?? 0.55;
  const rankingBonus = normalize(supervisor.education_discipline_ranking_level).includes("a") ? 1 : tierScore;
  const base = Math.max(tierScore, rankingBonus);
  if (!regionPreference) return base;
  return getSupervisorRegion(supervisor) === regionPreference ? 1 : base * 0.55;
};

const calculateRecommendation = (supervisor, input) => {
  const detectedFields = detectFieldTags(input.interest);
  const keywordTokens = tokenize(input.interest);
  const researchFieldSimilarity = overlapRatio(detectedFields, supervisor.research_fields);
  const keywordSimilarity = keywordMatchRatio(keywordTokens, supervisor);
  const methodCompatibility = methodologyScore(input.methodology, supervisor.methodology);
  const researchEnvironment = environmentScore(input.region, supervisor);
  const score =
    researchFieldSimilarity * 0.4 +
    keywordSimilarity * 0.25 +
    methodCompatibility * 0.2 +
    researchEnvironment * 0.15;

  const reasons = [];
  if (researchFieldSimilarity > 0) {
    const matchedFields = asArray(supervisor.research_fields)
      .filter((field) => detectedFields.includes(field))
      .map(fieldLabel)
      .join(", ");
    reasons.push(t("researchOverlap", matchedFields));
  }
  if (keywordSimilarity > 0) reasons.push(t("keywordEvidence"));
  if (input.methodology && methodCompatibility > 0) {
    reasons.push(
      input.methodology === supervisor.methodology
        ? t("methodExact", methodLabel(supervisor.methodology))
        : t("methodPartial", methodLabel(supervisor.methodology), methodLabel(input.methodology))
    );
  }
  if (input.region && getSupervisorRegion(supervisor) === input.region) {
    reasons.push(t("environmentMatched", regionLabel(input.region)));
  } else {
    reasons.push(t("environmentBaseline"));
  }
  if (!reasons.length) reasons.push(t("baselineReason"));

  return {
    supervisor,
    score,
    percentage: Math.round(score * 100),
    components: { researchFieldSimilarity, keywordSimilarity, methodCompatibility, researchEnvironment },
    explanation: reasons.join(state.lang === "zh" ? "；" : "; ")
  };
};

const applyTranslations = () => {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll(".language-button").forEach((button) => {
    const isActive = button.dataset.lang === state.lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const renderFieldOptions = () => {
  const selected = $("#field-filter").value;
  $("#field-filter").innerHTML = `
    <option value="">${escapeHTML(t("allFields"))}</option>
    ${state.fields.map((field) => `<option value="${escapeHTML(field.name)}">${escapeHTML(fieldLabel(field.name))}</option>`).join("")}
  `;
  $("#field-filter").value = selected;
};

const renderUniversityOptions = () => {
  const selected = $("#university-filter").value;
  const fromSupervisors = state.supervisors.map((supervisor) => supervisor.university).filter(Boolean);
  const fromTargets = [
    ...asArray(state.universities?.hong_kong_target_universities).map((item) => item.university_name),
    ...asArray(state.universities?.mainland_china_education_discipline_b_plus_or_above?.records).map((item) => item.university_name)
  ].filter(Boolean);
  const universities = [...new Set([...fromSupervisors, ...fromTargets])].sort((a, b) => a.localeCompare(b));
  $("#university-filter").innerHTML = `
    <option value="">${escapeHTML(t("allUniversities"))}</option>
    ${universities.map((name) => `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join("")}
  `;
  $("#university-filter").value = selected;
};

const renderTaxonomy = () => {
  $("#field-count").textContent = state.fields.length;
  $("#field-tree").innerHTML = state.fields
    .map((field, index) => {
      const isOpen = index < 2;
      const name = state.lang === "zh" ? field.name_zh : field.name;
      const description = state.lang === "zh" ? field.description_zh : field.description;
      const subfields = state.lang === "zh" ? field.subfields_zh : field.subfields;
      return `
        <article class="field-node ${isOpen ? "is-open" : ""}">
          <button class="field-toggle" type="button" aria-expanded="${isOpen ? "true" : "false"}">
            <strong>${escapeHTML(name)}</strong>
            <span aria-hidden="true">${isOpen ? "-" : "+"}</span>
          </button>
          <div class="field-body">
            <p>${escapeHTML(description)}</p>
            <ul class="subfield-list">
              ${asArray(subfields).map((subfield) => `<li>${escapeHTML(subfield)}</li>`).join("")}
            </ul>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".field-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const node = button.closest(".field-node");
      const isOpen = node.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.querySelector("span").textContent = isOpen ? "-" : "+";
    });
  });
};

const getFilterState = () => ({
  search: normalize($("#search-input").value),
  university: $("#university-filter").value,
  field: $("#field-filter").value,
  method: $("#method-filter").value,
  region: $("#region-filter").value,
  tier: $("#tier-filter").value,
  academicLevel: $("#academic-level-filter").value,
  publicationLevel: $("#publication-level-filter").value,
  sort: $("#sort-select").value
});

const supervisorMatchesFilters = (supervisor, filters) => {
  const haystack = searchableSupervisorText(supervisor);
  const title = supervisor.academic_title || "";
  return (
    (!filters.search || haystack.includes(filters.search)) &&
    (!filters.university || supervisor.university === filters.university) &&
    (!filters.field || asArray(supervisor.research_fields).includes(filters.field)) &&
    (!filters.method || supervisor.methodology === filters.method) &&
    (!filters.region || getSupervisorRegion(supervisor) === filters.region) &&
    (!filters.tier || supervisor.university_tier === filters.tier) &&
    (!filters.academicLevel || title === filters.academicLevel || (filters.academicLevel === "Other" && title && !["Assistant Professor", "Associate Professor", "Professor", "Chair Professor"].includes(title))) &&
    (!filters.publicationLevel || publicationActivity(supervisor) === filters.publicationLevel)
  );
};

const tierRank = (tier) => ({ Global: 4, "Hong Kong": 3, "Mainland China": 2, China: 2, Unknown: 1 }[tier] || 0);

const sortSupervisors = (items, sortMode) => {
  return [...items].sort((a, b) => {
    if (sortMode === "publication_activity") return getPublicationCount(b) - getPublicationCount(a);
    if (sortMode === "university_tier") return tierRank(b.university_tier) - tierRank(a.university_tier);
    const aScore = state.recommendationScores.get(getSupervisorId(a)) ?? publicationScore(getPublicationCount(a));
    const bScore = state.recommendationScores.get(getSupervisorId(b)) ?? publicationScore(getPublicationCount(b));
    return bScore - aScore;
  });
};

const renderLink = (url, label) => {
  if (!url) return `<span>${escapeHTML(t("unavailable"))}</span>`;
  return `<a href="${escapeHTML(url)}" target="_blank" rel="noreferrer">${escapeHTML(label)}</a>`;
};

const renderSupervisors = () => {
  const filters = getFilterState();
  const filtered = sortSupervisors(
    state.supervisors.filter((supervisor) => supervisorMatchesFilters(supervisor, filters)),
    filters.sort
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * state.pageSize;
  const visible = filtered.slice(start, start + state.pageSize);

  $("#supervisor-count").textContent = state.supervisors.length;
  $("#result-count").textContent = t("supervisorCount", filtered.length);
  $("#page-status").textContent = t("pageStatus", state.page, totalPages);
  $("#prev-page").disabled = state.page <= 1;
  $("#next-page").disabled = state.page >= totalPages;

  $("#supervisor-table").innerHTML =
    visible
      .map((supervisor) => {
        const supervisorId = getSupervisorId(supervisor);
        const score = state.recommendationScores.has(supervisorId)
          ? `${Math.round(state.recommendationScores.get(supervisorId) * 100)}%`
          : `${Math.round(publicationScore(getPublicationCount(supervisor)) * 100)} ${t("relevanceSuffix")}`;
        const sources = asArray(supervisor.source_urls);
        return `
          <tr>
            <td>
              <div class="person-cell">
                <strong>${escapeHTML(supervisor.name)}</strong>
                <span>${escapeHTML(supervisor.academic_title || t("notVerified"))}</span>
                <span>${escapeHTML(supervisor.university)} · ${escapeHTML(regionLabel(getSupervisorRegion(supervisor)))}</span>
                <span>${escapeHTML(supervisor.faculty_school || t("notVerified"))}</span>
                ${renderLink(getHomepage(supervisor), t("homepage"))}
                ${renderLink(getDepartmentPage(supervisor), t("departmentPage"))}
                ${supervisor.email ? `<a href="mailto:${escapeHTML(supervisor.email)}">${escapeHTML(supervisor.email)}</a>` : `<span>${escapeHTML(t("notVerified"))}</span>`}
              </div>
            </td>
            <td>
              <div class="field-tags">
                ${asArray(supervisor.research_fields).map((field) => `<span class="tag field">${escapeHTML(fieldLabel(field))}</span>`).join("") || `<span>${escapeHTML(t("notVerified"))}</span>`}
              </div>
            </td>
            <td>${escapeHTML(methodLabel(supervisor.methodology))}</td>
            <td>
              <strong>${escapeHTML(supervisor.publication_count ?? t("notVerified"))}</strong><br />
              <span>SSCI ${escapeHTML(supervisor.SSCI_publications ?? t("notVerified"))} · CSSCI ${escapeHTML(supervisor.CSSCI_publications ?? t("notVerified"))}</span><br />
              <span class="score-cell">${escapeHTML(score)}</span>
            </td>
            <td>
              <span class="status-pill ${normalize(getStatus(supervisor)).includes("limited") ? "limited" : ""}">${escapeHTML(getStatus(supervisor) || t("phdStatusUnknown"))}</span><br />
              <span>${escapeHTML(regionLabel(supervisor.university_tier))} ${escapeHTML(t("tierSuffix"))}</span><br />
              ${sources[0] ? renderLink(sources[0], t("source")) : `<span>${escapeHTML(t("notVerified"))}</span>`}
            </td>
          </tr>
        `;
      })
      .join("") ||
    `<tr><td colspan="5"><p class="empty-note">${escapeHTML(t("noSupervisorMatch"))}</p></td></tr>`;
};

const renderStructuredTags = (tags) => {
  $("#structured-tags").innerHTML =
    tags.length
      ? tags
          .map((tag) => `<span class="tag ${fieldAliases[tag] ? "field" : "keyword"}">${escapeHTML(tagLabel(tag))}</span>`)
          .join("")
      : `<span class="empty-note">${escapeHTML(t("tagsEmpty"))}</span>`;
};

const renderRecommendations = (matches) => {
  $("#recommendation-results").innerHTML =
    matches
      .slice(0, 5)
      .map(
        ({ supervisor, percentage, explanation, components }) => `
          <article class="match-card">
            <header>
              <div>
                <strong>${escapeHTML(supervisor.name)}</strong>
                <p>${escapeHTML(supervisor.university)} · ${escapeHTML(regionLabel(getSupervisorRegion(supervisor)))}</p>
              </div>
              <span class="match-score">${percentage}%</span>
            </header>
            <p><strong>${escapeHTML(t("recommendedBecause"))}:</strong> ${escapeHTML(explanation)}${state.lang === "zh" ? "。" : "."}</p>
            <div class="tag-list">
              <span class="tag field">${escapeHTML(t("scoreField"))} ${Math.round(components.researchFieldSimilarity * 100)}%</span>
              <span class="tag keyword">${escapeHTML(t("scoreKeyword"))} ${Math.round(components.keywordSimilarity * 100)}%</span>
              <span class="tag">${escapeHTML(t("scoreMethod"))} ${Math.round(components.methodCompatibility * 100)}%</span>
              <span class="tag">${escapeHTML(t("scoreEnvironment"))} ${Math.round(components.researchEnvironment * 100)}%</span>
            </div>
          </article>
        `
      )
      .join("") || `<p class="empty-note">${escapeHTML(t("matchesEmpty"))}</p>`;
};

const runRecommendation = (event) => {
  event.preventDefault();
  state.lastRecommendationInput = {
    interest: $("#interest-input").value,
    methodology: $("#method-preference").value,
    region: $("#region-preference").value
  };

  const tags = extractStructuredTags(state.lastRecommendationInput.interest);
  if (state.lastRecommendationInput.methodology) tags.push(state.lastRecommendationInput.methodology);
  if (state.lastRecommendationInput.region) tags.push(state.lastRecommendationInput.region);
  state.currentTags = [...new Set(tags)];

  const matches = state.supervisors
    .map((supervisor) => calculateRecommendation(supervisor, state.lastRecommendationInput))
    .sort((a, b) => b.score - a.score);
  state.recommendationScores = new Map(matches.map((match) => [getSupervisorId(match.supervisor), match.score]));
  state.page = 1;
  renderStructuredTags(state.currentTags);
  renderRecommendations(matches);
  renderSupervisors();
};

const rerenderRecommendationsForLanguage = () => {
  if (!state.lastRecommendationInput) {
    renderStructuredTags(extractStructuredTags($("#interest-input").value));
    $("#recommendation-results").innerHTML = `<p class="empty-note">${escapeHTML(t("matchesEmpty"))}</p>`;
    return;
  }
  const matches = state.supervisors
    .map((supervisor) => calculateRecommendation(supervisor, state.lastRecommendationInput))
    .sort((a, b) => b.score - a.score);
  renderStructuredTags(state.currentTags);
  renderRecommendations(matches);
};

const resetFilters = () => {
  ["#search-input", "#university-filter", "#field-filter", "#method-filter", "#region-filter", "#tier-filter", "#academic-level-filter", "#publication-level-filter"].forEach((selector) => {
    $(selector).value = "";
  });
  $("#sort-select").value = "relevance";
  state.page = 1;
  renderSupervisors();
};

const debounceRenderSupervisors = () => {
  window.clearTimeout(state.searchDebounceId);
  state.searchDebounceId = window.setTimeout(() => {
    state.page = 1;
    renderSupervisors();
  }, 180);
};

const setLanguage = (lang) => {
  state.lang = lang;
  localStorage.setItem("peis-lang", lang);
  applyTranslations();
  renderFieldOptions();
  renderUniversityOptions();
  renderTaxonomy();
  rerenderRecommendationsForLanguage();
  renderSupervisors();
};

const bindEvents = () => {
  $("#search-input").addEventListener("input", debounceRenderSupervisors);

  ["#university-filter", "#field-filter", "#method-filter", "#region-filter", "#tier-filter", "#academic-level-filter", "#publication-level-filter", "#sort-select"].forEach((selector) => {
    $(selector).addEventListener("input", () => {
      state.page = 1;
      renderSupervisors();
    });
  });
  $("#page-size").addEventListener("input", () => {
    state.pageSize = Number($("#page-size").value);
    state.page = 1;
    renderSupervisors();
  });
  $("#prev-page").addEventListener("click", () => {
    state.page = Math.max(1, state.page - 1);
    renderSupervisors();
  });
  $("#next-page").addEventListener("click", () => {
    state.page += 1;
    renderSupervisors();
  });
  $("#reset-filters").addEventListener("click", resetFilters);
  $("#recommendation-form").addEventListener("submit", runRecommendation);
  $("#interest-input").addEventListener("input", () => {
    state.lastRecommendationInput = null;
    state.recommendationScores = new Map();
    renderStructuredTags(extractStructuredTags($("#interest-input").value));
    renderSupervisors();
  });
  $("#expand-all").addEventListener("click", () => {
    document.querySelectorAll(".field-node").forEach((node) => {
      node.classList.add("is-open");
      node.querySelector(".field-toggle").setAttribute("aria-expanded", "true");
      node.querySelector(".field-toggle span").textContent = "-";
    });
  });
  $("#collapse-all").addEventListener("click", () => {
    document.querySelectorAll(".field-node").forEach((node) => {
      node.classList.remove("is-open");
      node.querySelector(".field-toggle").setAttribute("aria-expanded", "false");
      node.querySelector(".field-toggle span").textContent = "+";
    });
  });
  document.querySelectorAll(".language-button").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
};

const loadData = async () => {
  try {
    const [fieldResponse, supervisorResponse, universityResponse] = await Promise.all([
      fetch("data/research_fields.json"),
      fetch("data/supervisors.json"),
      fetch("data/universities.json")
    ]);
    if (!fieldResponse.ok || !supervisorResponse.ok) throw new Error("Unable to load PEIS JSON data.");

    const supervisorPayload = await supervisorResponse.json();
    state.fields = await fieldResponse.json();
    prepareSupervisorDataset(Array.isArray(supervisorPayload) ? supervisorPayload : supervisorPayload.supervisors);
    state.universities = universityResponse.ok ? await universityResponse.json() : null;

    applyTranslations();
    renderFieldOptions();
    renderUniversityOptions();
    renderTaxonomy();
    renderSupervisors();
    renderStructuredTags([]);
    bindEvents();
  } catch (error) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div class="load-error" role="alert">PEIS could not load local JSON data. Please serve the project through GitHub Pages or a local static server.</div>`
    );
    console.error(error);
  }
};

loadData();
