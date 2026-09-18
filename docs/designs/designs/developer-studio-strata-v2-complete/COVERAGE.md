# Developer Studio coverage matrix

Inventory date: 2026-09-08. The source snapshot contains 73 page files and 34 registry surfaces. Generation/visual verification is tracked separately; a mapping alone does not mean the image is delivered.

## Registered surfaces — expanded dynamic routing

| Surface | Kind / scope | Design treatment |
| --- | --- | --- |
| forms | builder; app, library | [36](36_forms.png), [37](37_form_builder.png) |
| advanced-forms | builder; app, library | [38](38_advanced_forms.png) |
| workflows | builder; app, library | [39](39_workflow_catalog.png), [11](../developer-studio-strata-v1/11_workflow_builder.png), [54](54_run_logs.png) |
| bpmn | builder; app | [44](44_bpmn.png) |
| dashboards | builder; app, library | [40](40_dashboard_catalog.png), [41](41_dashboard_builder.png) |
| data-objects | builder; app | [42](42_data_objects.png), [43](43_object_designer.png) |
| rules-engine | builder; app, library | [45](45_rules.png) |
| api-builder | builder; app | [46](46_api_builder.png) |
| logic | builder; app | [47](47_logic.png) |
| mobile-builder | builder; app | [48](48_mobile_builder.png) |
| site-pages | builder; site | [23](23_pages.png), [04](../developer-studio-strata-v1/04_website_builder.png) |
| site-collections | builder; site | [24](24_collections.png), [25](25_collection_editor.png) |
| site-blog | builder; site | [26](26_blog.png), [27](27_post_editor.png) |
| site-assets | builder; site | [28](28_assets.png) |
| site-menus | builder; site | [29](29_menus.png) |
| site-seo | builder; site | [30](30_seo.png) |
| site-ab-testing | builder; site | [31](31_experiments.png) |
| site-orders | data; site | [32](32_orders.png) |
| site-submissions | data; site | [33](33_submissions.png) |
| site-settings | settings; site | [34](34_site_settings.png), [35](35_site_revisions.png) |
| manage-developer-governance | settings; manage | [51](51_governance.png) |
| manage-releases | data; manage | [52](52_release_history.png), [13](../developer-studio-strata-v1/13_releases.png), [35](35_site_revisions.png) |
| manage-environments | settings; manage | [53](53_environments.png) |
| manage-logs | data; manage | [54](54_run_logs.png) |
| manage-access | settings; manage | [55](55_access_control.png), [14](../developer-studio-strata-v1/14_project_settings.png) |
| manage-components | settings; manage | [56](56_component_governance.png), [07](../developer-studio-strata-v1/07_resource_library.png), [08](../developer-studio-strata-v1/08_component_builder.png) |
| manage-connectors | settings; manage | [57](57_connectors.png), [10](../developer-studio-strata-v1/10_data_integrations.png) |
| manage-marketplace | settings; manage | [58](58_marketplace_packages.png) |
| manage-query-builder | builder; manage | [59](59_query_builder.png) |
| manage-widgets | builder; manage | [60](60_widgets.png) |
| manage-etl | builder; manage | [61](61_etl.png) |
| manage-theme | builder; manage | [62](62_theme_manager.png) |
| manage-git | settings; manage | [63](63_git.png) |
| manage-mobile-export | builder; manage | [64](64_mobile_export.png) |

The app/library editor routes resolve only registered entries with an editor. Wizard creation routes resolve workflow/dashboard creation. Site pages embed the page canvas. Single-surface builders use their primary page, not an invented separate editor route. Invalid dynamic segments use the shared not-found state.

## Every page file

| Source page | Treatment | Screens |
| --- | --- | --- |
| developer-platform/src/app/sites/[siteId]/[builder]/[artifactId]/page.tsx | dynamic: registry expanded | [23](23_pages.png), [04](../developer-studio-strata-v1/04_website_builder.png) |
| developer-platform/src/app/sites/[siteId]/[builder]/page.tsx | dynamic: registry expanded | [23](23_pages.png), [04](../developer-studio-strata-v1/04_website_builder.png), [24](24_collections.png), [25](25_collection_editor.png), [26](26_blog.png), [27](27_post_editor.png), [28](28_assets.png), [29](29_menus.png), [30](30_seo.png), [31](31_experiments.png), [32](32_orders.png), [33](33_submissions.png), [34](34_site_settings.png), [35](35_site_revisions.png) |
| developer-platform/src/app/sites/[siteId]/page.tsx | dedicated | [22](22_site_overview.png) |
| developer-platform/src/app/sdk/page.tsx | dedicated | [65](65_sdk.png) |
| developer-platform/src/app/login/page.tsx | dedicated | [73](73_auth_states.png) |
| developer-platform/src/app/library/[builder]/[artifactId]/page.tsx | dynamic: registry expanded | [36](36_forms.png), [37](37_form_builder.png), [39](39_workflow_catalog.png), [11](../developer-studio-strata-v1/11_workflow_builder.png), [54](54_run_logs.png), [40](40_dashboard_catalog.png), [41](41_dashboard_builder.png) |
| developer-platform/src/app/library/[builder]/page.tsx | dynamic: registry expanded | [36](36_forms.png), [37](37_form_builder.png), [38](38_advanced_forms.png), [39](39_workflow_catalog.png), [11](../developer-studio-strata-v1/11_workflow_builder.png), [54](54_run_logs.png), [40](40_dashboard_catalog.png), [41](41_dashboard_builder.png), [45](45_rules.png) |
| developer-platform/src/app/auth/callback/page.tsx | dedicated | [73](73_auth_states.png) |
| developer-platform/src/app/builder/web/canvas/page.tsx | dedicated | [04](../developer-studio-strata-v1/04_website_builder.png) |
| developer-platform/src/app/builder/web/ab-testing/page.tsx | dedicated | [31](31_experiments.png) |
| developer-platform/src/app/apps/[appId]/[builder]/[artifactId]/page.tsx | dynamic: registry expanded | [36](36_forms.png), [37](37_form_builder.png), [39](39_workflow_catalog.png), [11](../developer-studio-strata-v1/11_workflow_builder.png), [54](54_run_logs.png), [40](40_dashboard_catalog.png), [41](41_dashboard_builder.png) |
| developer-platform/src/app/apps/[appId]/[builder]/page.tsx | dynamic: registry expanded | [36](36_forms.png), [37](37_form_builder.png), [38](38_advanced_forms.png), [39](39_workflow_catalog.png), [11](../developer-studio-strata-v1/11_workflow_builder.png), [54](54_run_logs.png), [44](44_bpmn.png), [40](40_dashboard_catalog.png), [41](41_dashboard_builder.png), [42](42_data_objects.png), [43](43_object_designer.png), [45](45_rules.png), [46](46_api_builder.png), [47](47_logic.png), [48](48_mobile_builder.png) |
| developer-platform/src/app/apps/[appId]/page.tsx | dedicated | [21](21_app_overview.png), [49](49_app_customization.png), [75](75_project_settings.png) |
| developer-platform/src/app/builder/web/(hub)/submissions/page.tsx | dedicated | [33](33_submissions.png) |
| developer-platform/src/app/apps/[appId]/[builder]/new/page.tsx | dynamic: registry expanded | [39](39_workflow_catalog.png), [11](../developer-studio-strata-v1/11_workflow_builder.png), [54](54_run_logs.png), [40](40_dashboard_catalog.png), [41](41_dashboard_builder.png) |
| developer-platform/src/app/builder/web/(hub)/settings/page.tsx | dedicated | [34](34_site_settings.png), [35](35_site_revisions.png) |
| developer-platform/src/app/builder/web/(hub)/assets/page.tsx | dedicated | [28](28_assets.png) |
| developer-platform/src/app/builder/web/(hub)/collections/page.tsx | dedicated | [24](24_collections.png), [25](25_collection_editor.png) |
| developer-platform/src/app/builder/web/(hub)/seo/page.tsx | dedicated | [30](30_seo.png) |
| developer-platform/src/app/builder/web/(hub)/pages/page.tsx | dedicated | [23](23_pages.png), [04](../developer-studio-strata-v1/04_website_builder.png) |
| developer-platform/src/app/builder/web/(hub)/page.tsx | dedicated | [22](22_site_overview.png) |
| developer-platform/src/app/builder/web/(hub)/blog/page.tsx | dedicated | [26](26_blog.png), [27](27_post_editor.png) |
| developer-platform/src/app/builder/web/(hub)/orders/page.tsx | dedicated | [32](32_orders.png) |
| developer-platform/src/app/(platform)/sites/page.tsx | dedicated | [18](18_websites.png) |
| developer-platform/src/app/(platform)/library/page.tsx | dedicated | [06](../developer-studio-strata-v1/06_standalone_builders.png), [07](../developer-studio-strata-v1/07_resource_library.png), [72](72_resource_updates.png) |
| developer-platform/src/app/builder/manage/widgets/page.tsx | dedicated | [60](60_widgets.png) |
| developer-platform/src/app/builder/sites/[id]/page.tsx | dedicated | [22](22_site_overview.png) |
| developer-platform/src/app/builder/web/(hub)/menus/page.tsx | dedicated | [29](29_menus.png) |
| developer-platform/src/app/builder/manage/git/page.tsx | dedicated | [63](63_git.png) |
| developer-platform/src/app/(platform)/sites/new/page.tsx | dedicated | [20](20_new_website.png) |
| developer-platform/src/app/(platform)/page.tsx | dedicated | [01](../developer-studio-strata-v1/01_projects.png) |
| developer-platform/src/app/(platform)/apps/page.tsx | dedicated | [17](17_applications.png) |
| developer-platform/src/app/builder/manage/etl/page.tsx | dedicated | [61](61_etl.png) |
| developer-platform/src/app/builder/sites/templates/page.tsx | dedicated | [20](20_new_website.png) |
| developer-platform/src/app/builder/manage/theme-manager/page.tsx | dedicated | [62](62_theme_manager.png) |
| developer-platform/src/app/builder/sites/page.tsx | dedicated | [18](18_websites.png) |
| developer-platform/src/app/builder/manage/components/page.tsx | dedicated | [56](56_component_governance.png), [07](../developer-studio-strata-v1/07_resource_library.png), [08](../developer-studio-strata-v1/08_component_builder.png) |
| developer-platform/src/app/(platform)/apps/new/page.tsx | dedicated | [19](19_new_application.png) |
| developer-platform/src/app/builder/manage/environments/page.tsx | dedicated | [53](53_environments.png) |
| developer-platform/src/app/(platform)/manage/page.tsx | dedicated | [50](50_manage.png) |
| developer-platform/src/app/builder/manage/releases/page.tsx | dedicated | [52](52_release_history.png), [13](../developer-studio-strata-v1/13_releases.png), [35](35_site_revisions.png) |
| developer-platform/src/app/builder/manage/page.tsx | dedicated | [50](50_manage.png) |
| developer-platform/src/app/(platform)/manage/[section]/page.tsx | dynamic: registry expanded | [51](51_governance.png), [52](52_release_history.png), [13](../developer-studio-strata-v1/13_releases.png), [35](35_site_revisions.png), [53](53_environments.png), [54](54_run_logs.png), [55](55_access_control.png), [14](../developer-studio-strata-v1/14_project_settings.png), [56](56_component_governance.png), [07](../developer-studio-strata-v1/07_resource_library.png), [08](../developer-studio-strata-v1/08_component_builder.png), [57](57_connectors.png), [10](../developer-studio-strata-v1/10_data_integrations.png), [58](58_marketplace_packages.png), [59](59_query_builder.png), [60](60_widgets.png), [61](61_etl.png), [62](62_theme_manager.png), [63](63_git.png), [64](64_mobile_export.png) |
| developer-platform/src/app/builder/manage/access/page.tsx | dedicated | [55](55_access_control.png), [14](../developer-studio-strata-v1/14_project_settings.png) |
| developer-platform/src/app/builder/manage/developer-governance/page.tsx | dedicated | [51](51_governance.png) |
| developer-platform/src/app/builder/manage/connectors/page.tsx | dedicated | [57](57_connectors.png), [10](../developer-studio-strata-v1/10_data_integrations.png) |
| developer-platform/src/app/builder/manage/query-builder/page.tsx | dedicated | [59](59_query_builder.png) |
| developer-platform/src/app/builder/manage/logs/page.tsx | dedicated | [54](54_run_logs.png) |
| developer-platform/src/app/builder/app-hub/page.tsx | dedicated | [17](17_applications.png) |
| developer-platform/src/app/builder/erp/bpmn/page.tsx | dedicated | [44](44_bpmn.png) |
| developer-platform/src/app/builder/erp/page.tsx | dedicated | [17](17_applications.png) |
| developer-platform/src/app/builder/manage/marketplace/page.tsx | dedicated | [58](58_marketplace_packages.png) |
| developer-platform/src/app/builder/erp/api-builder/page.tsx | dedicated | [46](46_api_builder.png) |
| developer-platform/src/app/builder/manage/mobile-export/page.tsx | dedicated | [64](64_mobile_export.png) |
| developer-platform/src/app/builder/erp/logic/page.tsx | dedicated | [47](47_logic.png) |
| developer-platform/src/app/builder/erp/rules-engine/page.tsx | dedicated | [45](45_rules.png) |
| developer-platform/src/app/builder/erp/apps/[id]/page.tsx | dedicated | [21](21_app_overview.png), [49](49_app_customization.png), [75](75_project_settings.png) |
| developer-platform/src/app/builder/erp/advanced-forms/page.tsx | dedicated | [38](38_advanced_forms.png) |
| developer-platform/src/app/builder/erp/data/page.tsx | dedicated | [42](42_data_objects.png), [43](43_object_designer.png) |
| developer-platform/src/app/builder/erp/mobile-builder/page.tsx | dedicated | [48](48_mobile_builder.png) |
| developer-platform/src/app/builder/erp/modules/page.tsx | dedicated | [17](17_applications.png) |
| developer-platform/src/app/builder/erp/workflows/page.tsx | dedicated | [39](39_workflow_catalog.png), [11](../developer-studio-strata-v1/11_workflow_builder.png), [54](54_run_logs.png) |
| developer-platform/src/app/builder/erp/workflows/[id]/page.tsx | dedicated | [39](39_workflow_catalog.png), [11](../developer-studio-strata-v1/11_workflow_builder.png), [54](54_run_logs.png) |
| developer-platform/src/app/builder/erp/forms/page.tsx | dedicated | [36](36_forms.png), [37](37_form_builder.png) |
| developer-platform/src/app/builder/erp/workflows/new/page.tsx | dedicated | [39](39_workflow_catalog.png), [11](../developer-studio-strata-v1/11_workflow_builder.png), [54](54_run_logs.png) |
| developer-platform/src/app/builder/erp/customize/page.tsx | dedicated | [49](49_app_customization.png) |
| developer-platform/src/app/builder/erp/data-objects/page.tsx | dedicated | [42](42_data_objects.png), [43](43_object_designer.png) |
| developer-platform/src/app/builder/erp/modules/[id]/page.tsx | dedicated | [21](21_app_overview.png), [49](49_app_customization.png), [75](75_project_settings.png) |
| developer-platform/src/app/builder/erp/forms/[id]/page.tsx | dedicated | [36](36_forms.png), [37](37_form_builder.png) |
| developer-platform/src/app/builder/erp/dashboards/page.tsx | dedicated | [40](40_dashboard_catalog.png), [41](41_dashboard_builder.png) |
| developer-platform/src/app/builder/erp/data-objects/[id]/page.tsx | dedicated | [42](42_data_objects.png), [43](43_object_designer.png) |
| developer-platform/src/app/builder/erp/dashboards/[id]/page.tsx | dedicated | [40](40_dashboard_catalog.png), [41](41_dashboard_builder.png) |
| developer-platform/src/app/builder/erp/dashboards/new/page.tsx | dedicated | [40](40_dashboard_catalog.png), [41](41_dashboard_builder.png) |

## Owning functional requirements

| Requirement | Visual coverage |
| --- | --- |
| DEV-FR-001 versioned APIs/schemas | [15](../developer-studio-strata-v1/15_api_extensions.png), [46](46_api_builder.png), [65](65_sdk.png), [71](71_diagnostics.png) |
| DEV-FR-002 scoped credentials/rotation | [66](66_credentials.png), [67](67_credential_lifecycle.png) |
| DEV-FR-003 signed bundle build/validation | [68](68_extensions.png), [69](69_extension_package.png) |
| DEV-FR-004 capability/budget sandbox | [47](47_logic.png), [70](70_sandbox.png) |
| DEV-FR-005 failures/quotas/deprecation | [54](54_run_logs.png), [71](71_diagnostics.png) |
| SITE-FR-001 sites/pages/versioned content | [20](20_new_website.png), [23](23_pages.png), [04](../developer-studio-strata-v1/04_website_builder.png), [24](24_collections.png), [25](25_collection_editor.png) |
| SITE-FR-002 responsive draft preview | [04](../developer-studio-strata-v1/04_website_builder.png), [12](../developer-studio-strata-v1/12_responsive_preview.png) |
| SITE-FR-003 revision publishing/domains | [13](../developer-studio-strata-v1/13_releases.png), [34](34_site_settings.png), [35](35_site_revisions.png) |
| SITE-FR-004 public content/commerce | [24](24_collections.png), [26](26_blog.png), [27](27_post_editor.png), [32](32_orders.png) |
| SITE-FR-005 rollback/unpublish/health | [22](22_site_overview.png), [35](35_site_revisions.png), [54](54_run_logs.png) |

## User experience requirements

| Request | Screens |
| --- | --- |
| Project-first unified builders | [01](../developer-studio-strata-v1/01_projects.png), [02](../developer-studio-strata-v1/02_create_project.png), [03](../developer-studio-strata-v1/03_project_overview.png), [17](17_applications.png), [18](18_websites.png), [19](19_new_application.png), [20](20_new_website.png), [21](21_app_overview.png), [22](22_site_overview.png) |
| Standalone builders and later linking | [06](../developer-studio-strata-v1/06_standalone_builders.png), [07](../developer-studio-strata-v1/07_resource_library.png), [08](../developer-studio-strata-v1/08_component_builder.png), [09](../developer-studio-strata-v1/09_link_to_project.png), [36](36_forms.png), [38](38_advanced_forms.png), [40](40_dashboard_catalog.png), [72](72_resource_updates.png) |
| Website and app visual editors | [04](../developer-studio-strata-v1/04_website_builder.png), [05](../developer-studio-strata-v1/05_app_builder.png), [37](37_form_builder.png), [41](41_dashboard_builder.png), [44](44_bpmn.png), [45](45_rules.png), [46](46_api_builder.png), [47](47_logic.png), [48](48_mobile_builder.png), [59](59_query_builder.png), [60](60_widgets.png), [61](61_etl.png), [62](62_theme_manager.png) |
| Browser-like tabs and global navigation | [16](../developer-studio-strata-v1/16_navigation_states.png), [76](76_workspace_utilities.png) |
| Lifecycle/access/recovery | [35](35_site_revisions.png), [52](52_release_history.png), [55](55_access_control.png), [66](66_credentials.png), [67](67_credential_lifecycle.png), [69](69_extension_package.png), [70](70_sandbox.png), [73](73_auth_states.png), [74](74_system_states.png), [75](75_project_settings.png) |

See [state coverage](STATE_COVERAGE.md) for shared states. This is 100% mapping of the dated inventory; final delivery coverage additionally requires all mapped files and their visual review. It is not a claim of 100% implementation, exhaustive state permutations or accessibility conformance.
