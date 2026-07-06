const state = {
  fields: [],
  supervisors: [],
  currentTags: [],
  recommendationScores: new Map(),
  lastRecommendationInput: null,
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
      "PEIS helps applicants explore education research areas, compare sample supervisor profiles, and generate transparent fit recommendations without any backend, external API, or personal data storage.",
    metricFields: "Research Fields",
    metricSupervisors: "Sample Supervisors",
    metricStatic: "Static Frontend",
    moduleOne: "Module 1",
    moduleTwo: "Module 2",
    moduleThree: "Module 3",
    fieldMapTitle: "Research Field Map",
    fieldMapDescription: "Expand taxonomy branches to inspect subfields, methods, and application contexts.",
    expandAll: "Expand All",
    collapseAll: "Collapse All",
    databaseTitle: "Supervisor Database",
    databaseDescription: "Search, filter, and sort placeholder supervisor records stored in JSON.",
    searchLabel: "Search supervisors",
    searchPlaceholder: "Name, keyword, or university",
    fieldFilterLabel: "Research field",
    allFields: "All fields",
    methodFilterLabel: "Methodology",
    allMethods: "All methods",
    methodQualitative: "Qualitative",
    methodQuantitative: "Quantitative",
    methodMixed: "Mixed",
    regionFilterLabel: "Region",
    allRegions: "All regions",
    regionChina: "China",
    regionHongKong: "Hong Kong",
    regionGlobal: "Global",
    tierFilterLabel: "University tier",
    allTiers: "All tiers",
    tierChina: "China",
    tierHongKong: "Hong Kong",
    tierGlobal: "Global",
    sortLabel: "Sort by",
    sortRelevance: "Relevance score",
    sortPublications: "Publication count",
    resetFilters: "Reset filters",
    tableSupervisor: "Supervisor",
    tableResearchFit: "Research Fit",
    tableMethod: "Method",
    tableOutputs: "Outputs",
    tableStatus: "Status",
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
    matchesEmpty: "Results will appear after running the local scoring engine.",
    footerNotice:
      "PEIS is a static demonstration system using placeholder sample supervisors. Applicants should verify every real supervisor profile through official university sources.",
    homepage: "Homepage",
    department: "Department",
    supervisorCount: (count) => `${count} supervisor${count === 1 ? "" : "s"}`,
    noSupervisorMatch: "No supervisors match the current filters.",
    relevanceSuffix: "rel.",
    tierSuffix: "tier",
    scoreField: "field",
    scoreKeyword: "keyword",
    scoreMethod: "method",
    scoreTier: "tier",
    statusOpen: "Open to inquiries",
    statusSelective: "Selective intake",
    statusLimited: "Limited capacity",
    countryUnitedKingdom: "United Kingdom",
    countryUnitedStates: "United States",
    countryAustralia: "Australia",
    countryCanada: "Canada",
    countryJapan: "Japan",
    countrySingapore: "Singapore",
    countryFinland: "Finland",
    countrySpain: "Spain",
    researchOverlap: (fields) => `research field overlap with ${fields}`,
    keywordEvidence: "keyword evidence from profile topics",
    methodExact: (method) => `${method} methodology exactly matches preference`,
    methodPartial: (method, preference) => `${method} methodology is partially compatible with ${preference} preference`,
    regionMatched: (region) => `${region} region preference matched`,
    baselineReason: "baseline tier and methodology signals provide a low-confidence exploratory match"
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
      "PEIS 帮助申请者探索教育研究领域、比较示例导师档案，并在无后端、无外部 API、无个人数据存储的前提下生成透明的匹配推荐。",
    metricFields: "研究领域",
    metricSupervisors: "示例导师",
    metricStatic: "纯静态前端",
    moduleOne: "模块 1",
    moduleTwo: "模块 2",
    moduleThree: "模块 3",
    fieldMapTitle: "研究领域地图",
    fieldMapDescription: "展开分类层级，查看子领域、方法取向与应用场景。",
    expandAll: "全部展开",
    collapseAll: "全部收起",
    databaseTitle: "导师数据库",
    databaseDescription: "搜索、筛选并排序存储在 JSON 中的示例导师记录。",
    searchLabel: "搜索导师",
    searchPlaceholder: "姓名、关键词或大学",
    fieldFilterLabel: "研究领域",
    allFields: "全部领域",
    methodFilterLabel: "研究方法",
    allMethods: "全部方法",
    methodQualitative: "质性",
    methodQuantitative: "量化",
    methodMixed: "混合",
    regionFilterLabel: "地区",
    allRegions: "全部地区",
    regionChina: "中国内地",
    regionHongKong: "中国香港",
    regionGlobal: "全球",
    tierFilterLabel: "大学层级",
    allTiers: "全部层级",
    tierChina: "中国内地",
    tierHongKong: "中国香港",
    tierGlobal: "全球",
    sortLabel: "排序方式",
    sortRelevance: "相关度评分",
    sortPublications: "发表数量",
    resetFilters: "重置筛选",
    tableSupervisor: "导师",
    tableResearchFit: "研究匹配",
    tableMethod: "方法",
    tableOutputs: "成果",
    tableStatus: "状态",
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
    matchesEmpty: "运行本地评分引擎后将在这里显示结果。",
    footerNotice:
      "PEIS 是使用示例导师数据的静态演示系统。申请者在做真实申请决定前，应通过大学官方来源核实导师主页、邮箱、发表与招生状态。",
    homepage: "个人主页",
    department: "院系页面",
    supervisorCount: (count) => `${count} 位导师`,
    noSupervisorMatch: "当前筛选条件下没有匹配导师。",
    relevanceSuffix: "相关度",
    tierSuffix: "层级",
    scoreField: "领域",
    scoreKeyword: "关键词",
    scoreMethod: "方法",
    scoreTier: "层级",
    statusOpen: "可咨询",
    statusSelective: "选择性招生",
    statusLimited: "名额有限",
    countryUnitedKingdom: "英国",
    countryUnitedStates: "美国",
    countryAustralia: "澳大利亚",
    countryCanada: "加拿大",
    countryJapan: "日本",
    countrySingapore: "新加坡",
    countryFinland: "芬兰",
    countrySpain: "西班牙",
    researchOverlap: (fields) => `研究领域重合：${fields}`,
    keywordEvidence: "导师档案主题中存在关键词证据",
    methodExact: (method) => `${method}方法与偏好完全一致`,
    methodPartial: (method, preference) => `${method}方法与${preference}偏好部分兼容`,
    regionMatched: (region) => `符合${region}地区偏好`,
    baselineReason: "基于大学层级与方法信号形成低置信度探索性匹配"
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
  "about",
  "across",
  "also",
  "and",
  "are",
  "based",
  "between",
  "for",
  "from",
  "how",
  "into",
  "learning",
  "method",
  "methods",
  "research",
  "study",
  "the",
  "their",
  "through",
  "with",
  "教育",
  "研究",
  "学习",
  "方法",
  "申请",
  "导师"
]);

const $ = (selector) => document.querySelector(selector);
const t = (key, ...args) => {
  const value = translations[state.lang][key] ?? translations.en[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
};

const normalize = (value) => String(value || "").trim().toLowerCase();

const escapeHTML = (value) =>
  String(value || "").replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return replacements[character];
  });

const statusClass = (status) => {
  const value = normalize(status);
  if (value.includes("limited")) return "limited";
  if (value.includes("closed")) return "closed";
  return "";
};

const methodLabel = (method) => {
  const labels = {
    qualitative: t("methodQualitative"),
    quantitative: t("methodQuantitative"),
    mixed: t("methodMixed")
  };
  return labels[method] || method;
};

const regionLabel = (region) => {
  const labels = {
    China: t("regionChina"),
    "Hong Kong": t("regionHongKong"),
    Global: t("regionGlobal")
  };
  return labels[region] || region;
};

const countryLabel = (country) => {
  const labels = {
    China: t("regionChina"),
    "Hong Kong": t("regionHongKong"),
    "United Kingdom": t("countryUnitedKingdom"),
    "United States": t("countryUnitedStates"),
    Australia: t("countryAustralia"),
    Canada: t("countryCanada"),
    Japan: t("countryJapan"),
    Singapore: t("countrySingapore"),
    Finland: t("countryFinland"),
    Spain: t("countrySpain")
  };
  return labels[country] || country;
};

const statusLabel = (status) => {
  const value = normalize(status);
  if (value.includes("selective")) return t("statusSelective");
  if (value.includes("limited")) return t("statusLimited");
  return t("statusOpen");
};

const fieldByName = (name) => state.fields.find((field) => field.name === name);
const fieldLabel = (name) => {
  const field = fieldByName(name);
  return state.lang === "zh" && field?.name_zh ? field.name_zh : name;
};

const tagLabel = (tag) => {
  if (fieldAliases[tag]) return fieldLabel(tag);
  if (["qualitative", "quantitative", "mixed"].includes(tag)) return methodLabel(tag);
  if (["China", "Hong Kong", "Global"].includes(tag)) return regionLabel(tag);
  return tag;
};

const regionForSupervisor = (supervisor) => {
  if (supervisor.country === "China") return "China";
  if (supervisor.country === "Hong Kong") return "Hong Kong";
  return "Global";
};

const publicationScore = (count) => {
  const max = Math.max(...state.supervisors.map((supervisor) => supervisor.publication_count));
  return max ? count / max : 0;
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
  const tokens = tokenize(text);
  const keywordTags = [...new Set(tokens)].slice(0, 12);
  return [...new Set([...fieldTags, ...keywordTags])];
};

const overlapRatio = (sourceItems, targetItems) => {
  if (!sourceItems.length) return 0;
  const target = new Set(targetItems.map(normalize));
  const matches = sourceItems.filter((item) => target.has(normalize(item))).length;
  return matches / sourceItems.length;
};

const searchableSupervisorText = (supervisor) =>
  normalize(
    [
      supervisor.name,
      supervisor.university,
      supervisor.country,
      countryLabel(supervisor.country),
      supervisor.research_fields.join(" "),
      supervisor.research_fields.map(fieldLabel).join(" "),
      supervisor.keywords.join(" ")
    ].join(" ")
  );

const keywordMatchRatio = (tokens, supervisor) => {
  if (!tokens.length) return 0;
  const searchable = searchableSupervisorText(supervisor);
  const matches = tokens.filter((token) => searchable.includes(normalize(token))).length;
  return Math.min(matches / Math.max(tokens.length, 1), 1);
};

const methodologyScore = (preference, supervisorMethod) => {
  if (!preference) return 0.5;
  if (preference === supervisorMethod) return 1;
  if (preference === "mixed" || supervisorMethod === "mixed") return 0.65;
  return 0;
};

const tierBonusScore = (regionPreference, supervisor) => {
  const baseTier = {
    Global: 1,
    "Hong Kong": 0.9,
    China: 0.82
  }[supervisor.university_tier] || 0.75;

  if (!regionPreference) return baseTier;
  return regionPreference === regionForSupervisor(supervisor) ? 1 : baseTier * 0.55;
};

const calculateRecommendation = (supervisor, input) => {
  const detectedFields = detectFieldTags(input.interest);
  const keywordTokens = tokenize(input.interest);
  const researchFieldOverlap = overlapRatio(detectedFields, supervisor.research_fields);
  const keywordMatch = keywordMatchRatio(keywordTokens, supervisor);
  const methodMatch = methodologyScore(input.methodology, supervisor.methodology);
  const tierBonus = tierBonusScore(input.region, supervisor);
  const score =
    researchFieldOverlap * 0.4 +
    keywordMatch * 0.2 +
    methodMatch * 0.3 +
    tierBonus * 0.1;

  const reasons = [];
  if (researchFieldOverlap > 0) {
    const matchedFields = supervisor.research_fields
      .filter((field) => detectedFields.includes(field))
      .map(fieldLabel)
      .join(", ");
    reasons.push(t("researchOverlap", matchedFields));
  }
  if (keywordMatch > 0) {
    reasons.push(t("keywordEvidence"));
  }
  if (input.methodology && methodMatch > 0) {
    reasons.push(
      input.methodology === supervisor.methodology
        ? t("methodExact", methodLabel(supervisor.methodology))
        : t("methodPartial", methodLabel(supervisor.methodology), methodLabel(input.methodology))
    );
  }
  if (input.region && input.region === regionForSupervisor(supervisor)) {
    reasons.push(t("regionMatched", regionLabel(input.region)));
  }
  if (!reasons.length) {
    reasons.push(t("baselineReason"));
  }

  return {
    supervisor,
    score,
    percentage: Math.round(score * 100),
    components: {
      researchFieldOverlap,
      keywordMatch,
      methodMatch,
      tierBonus
    },
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
              ${subfields.map((subfield) => `<li>${escapeHTML(subfield)}</li>`).join("")}
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
  field: $("#field-filter").value,
  method: $("#method-filter").value,
  region: $("#region-filter").value,
  tier: $("#tier-filter").value,
  sort: $("#sort-select").value
});

const supervisorMatchesFilters = (supervisor, filters) => {
  const haystack = searchableSupervisorText(supervisor);
  return (
    (!filters.search || haystack.includes(filters.search)) &&
    (!filters.field || supervisor.research_fields.includes(filters.field)) &&
    (!filters.method || supervisor.methodology === filters.method) &&
    (!filters.region || regionForSupervisor(supervisor) === filters.region) &&
    (!filters.tier || supervisor.university_tier === filters.tier)
  );
};

const sortSupervisors = (items, sortMode) => {
  return [...items].sort((a, b) => {
    if (sortMode === "publications") {
      return b.publication_count - a.publication_count;
    }
    const aScore = state.recommendationScores.get(a.id) ?? publicationScore(a.publication_count);
    const bScore = state.recommendationScores.get(b.id) ?? publicationScore(b.publication_count);
    return bScore - aScore;
  });
};

const renderSupervisors = () => {
  const filters = getFilterState();
  const filtered = sortSupervisors(
    state.supervisors.filter((supervisor) => supervisorMatchesFilters(supervisor, filters)),
    filters.sort
  );

  $("#supervisor-count").textContent = state.supervisors.length;
  $("#result-count").textContent = t("supervisorCount", filtered.length);
  $("#supervisor-table").innerHTML =
    filtered
      .map((supervisor) => {
        const score = state.recommendationScores.has(supervisor.id)
          ? `${Math.round(state.recommendationScores.get(supervisor.id) * 100)}%`
          : `${Math.round(publicationScore(supervisor.publication_count) * 100)} ${t("relevanceSuffix")}`;

        return `
          <tr>
            <td>
              <div class="person-cell">
                <strong>${escapeHTML(supervisor.name)}</strong>
                <span>${escapeHTML(supervisor.university)} · ${escapeHTML(countryLabel(supervisor.country))}</span>
                <a href="${escapeHTML(supervisor.homepage_url)}" target="_blank" rel="noreferrer">${escapeHTML(t("homepage"))}</a>
                <a href="${escapeHTML(supervisor.department_url)}" target="_blank" rel="noreferrer">${escapeHTML(t("department"))}</a>
                <a href="mailto:${escapeHTML(supervisor.email)}">${escapeHTML(supervisor.email)}</a>
              </div>
            </td>
            <td>
              <div class="field-tags">
                ${supervisor.research_fields.map((field) => `<span class="tag field">${escapeHTML(fieldLabel(field))}</span>`).join("")}
              </div>
            </td>
            <td>${escapeHTML(methodLabel(supervisor.methodology))}</td>
            <td>
              <strong>${supervisor.publication_count}</strong><br />
              <span>${escapeHTML(supervisor.journal_ranking_level)}</span><br />
              <span class="score-cell">${escapeHTML(score)}</span>
            </td>
            <td>
              <span class="status-pill ${statusClass(supervisor.supervision_status)}">${escapeHTML(statusLabel(supervisor.supervision_status))}</span><br />
              <span>${escapeHTML(regionLabel(supervisor.university_tier))} ${escapeHTML(t("tierSuffix"))}</span>
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
          .map((tag) => {
            const isField = Boolean(fieldAliases[tag]);
            const label = tagLabel(tag);
            return `<span class="tag ${isField ? "field" : "keyword"}">${escapeHTML(label)}</span>`;
          })
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
                <p>${escapeHTML(supervisor.university)} · ${escapeHTML(regionLabel(regionForSupervisor(supervisor)))}</p>
              </div>
              <span class="match-score">${percentage}%</span>
            </header>
            <p>${escapeHTML(explanation)}${state.lang === "zh" ? "。" : "."}</p>
            <div class="tag-list">
              <span class="tag field">${escapeHTML(t("scoreField"))} ${Math.round(components.researchFieldOverlap * 100)}%</span>
              <span class="tag keyword">${escapeHTML(t("scoreKeyword"))} ${Math.round(components.keywordMatch * 100)}%</span>
              <span class="tag">${escapeHTML(t("scoreMethod"))} ${Math.round(components.methodMatch * 100)}%</span>
              <span class="tag">${escapeHTML(t("scoreTier"))} ${Math.round(components.tierBonus * 100)}%</span>
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

  state.recommendationScores = new Map(matches.map((match) => [match.supervisor.id, match.score]));
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
  $("#search-input").value = "";
  $("#field-filter").value = "";
  $("#method-filter").value = "";
  $("#region-filter").value = "";
  $("#tier-filter").value = "";
  $("#sort-select").value = "relevance";
  renderSupervisors();
};

const setLanguage = (lang) => {
  state.lang = lang;
  localStorage.setItem("peis-lang", lang);
  applyTranslations();
  renderFieldOptions();
  renderTaxonomy();
  rerenderRecommendationsForLanguage();
  renderSupervisors();
};

const bindEvents = () => {
  ["#search-input", "#field-filter", "#method-filter", "#region-filter", "#tier-filter", "#sort-select"].forEach((selector) => {
    $(selector).addEventListener("input", renderSupervisors);
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
    const [fieldResponse, supervisorResponse] = await Promise.all([
      fetch("data/research_fields.json"),
      fetch("data/supervisors.json")
    ]);

    if (!fieldResponse.ok || !supervisorResponse.ok) {
      throw new Error("Unable to load PEIS JSON data.");
    }

    state.fields = await fieldResponse.json();
    state.supervisors = await supervisorResponse.json();

    applyTranslations();
    renderFieldOptions();
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
