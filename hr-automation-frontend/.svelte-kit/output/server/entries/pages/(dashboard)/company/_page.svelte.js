import { d as store_get, u as unsubscribe_stores, m as head, a as attr, n as stringify } from "../../../../chunks/index2.js";
import { a as authStore } from "../../../../chunks/auth.svelte.js";
import { u as useCompanies, a as useCompany, c as createUpdateCompanyMutation, b as createRegisterCompanyMutation } from "../../../../chunks/companies.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input } from "../../../../chunks/Input.js";
import "clsx";
import { L as Label } from "../../../../chunks/Label.js";
import { S as Select } from "../../../../chunks/Select.js";
import { S as Skeleton } from "../../../../chunks/Skeleton.js";
import { a as toast } from "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { S as Square_pen } from "../../../../chunks/square-pen.js";
import { B as Building_2 } from "../../../../chunks/building-2.js";
import { M as Map_pin } from "../../../../chunks/map-pin.js";
import { U as Users } from "../../../../chunks/users.js";
import { G as Globe } from "../../../../chunks/globe.js";
import { M as Mail } from "../../../../chunks/mail.js";
import { P as Phone } from "../../../../chunks/phone.js";
import { X } from "../../../../chunks/x.js";
import { S as Save } from "../../../../chunks/save.js";
import { U as Upload } from "../../../../chunks/upload.js";
import { Y as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const companySizeOptions = [
      { value: "1-10", label: "1-10 employees" },
      { value: "11-50", label: "11-50 employees" },
      { value: "51-200", label: "51-200 employees" },
      { value: "201-500", label: "201-500 employees" },
      { value: "501-1000", label: "501-1000 employees" },
      { value: "1001+", label: "1000+ employees" }
    ];
    const companiesQuery = useCompanies({ limit: 1 });
    const companyId = authStore.companyId || store_get($$store_subs ??= {}, "$companiesQuery", companiesQuery).data?.data?.[0]?.company_id || null;
    const companyQuery = useCompany(companyId);
    const updateMutation = createUpdateCompanyMutation();
    const registerMutation = createRegisterCompanyMutation();
    let isEditing = false;
    let formData = {
      company_name: "",
      description: "",
      industry: "",
      size: "",
      website: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip_code: ""
    };
    const company = store_get($$store_subs ??= {}, "$companyQuery", companyQuery).data;
    const hasCompany = !!company && !!company.company_id;
    function startEditing() {
      isEditing = true;
    }
    function cancelEditing() {
      isEditing = false;
      if (company) {
        formData = {
          company_name: company.company_name || "",
          description: "",
          industry: company.industry || "",
          size: company.size || "",
          website: company.website || "",
          email: company.email || "",
          phone: company.phone || "",
          address: company.address?.street || "",
          city: company.address?.city || "",
          state: company.address?.state || "",
          country: company.address?.country || "",
          zip_code: company.address?.zip_code || ""
        };
      }
    }
    async function handleSave() {
      if (!formData.company_name || !formData.email || !formData.industry || !formData.size) {
        toast.error("Please fill in all required fields", {
          description: "Company name, email, industry, and size are required"
        });
        return;
      }
      try {
        if (hasCompany && companyId) {
          await store_get($$store_subs ??= {}, "$updateMutation", updateMutation).mutateAsync({
            companyId,
            payload: {
              company_name: formData.company_name,
              industry: formData.industry,
              size: formData.size,
              website: formData.website || void 0,
              phone: formData.phone || void 0,
              address: {
                street: formData.address || void 0,
                city: formData.city || void 0,
                state: formData.state || void 0,
                country: formData.country || void 0,
                zip_code: formData.zip_code || void 0
              }
            }
          });
          toast.success("Company profile updated successfully");
        } else {
          const result = await store_get($$store_subs ??= {}, "$registerMutation", registerMutation).mutateAsync({
            company_name: formData.company_name,
            email: formData.email,
            industry: formData.industry,
            size: formData.size,
            website: formData.website || void 0,
            phone: formData.phone || void 0,
            address: {
              street: formData.address || void 0,
              city: formData.city || void 0,
              state: formData.state || void 0,
              country: formData.country || void 0,
              zip_code: formData.zip_code || void 0
            }
          });
          if (result?.data?.company_id) {
            authStore.setCompany(result.data);
          }
          toast.success("Company registered successfully");
          store_get($$store_subs ??= {}, "$companyQuery", companyQuery).refetch();
        }
        isEditing = false;
      } catch (error) {
        toast.error(
          hasCompany ? "Failed to update company profile" : "Failed to register company",
          { description: error.message || "Please try again" }
        );
      }
    }
    const isSaving = store_get($$store_subs ??= {}, "$updateMutation", updateMutation).isPending || store_get($$store_subs ??= {}, "$registerMutation", registerMutation).isPending;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("n3eeq8", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Company Profile | HR Automation</title>`);
        });
      });
      $$renderer3.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900">Company Profile</h1> <p class="text-gray-500 mt-1">Manage your company information and settings</p></div> `);
      if (!isEditing) {
        $$renderer3.push("<!--[-->");
        Button($$renderer3, {
          variant: "outline",
          onclick: startEditing,
          children: ($$renderer4) => {
            Square_pen($$renderer4, { class: "w-4 h-4 mr-2" });
            $$renderer4.push(`<!----> Edit Profile`);
          }
        });
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="flex gap-2">`);
        Button($$renderer3, {
          variant: "outline",
          onclick: cancelEditing,
          children: ($$renderer4) => {
            X($$renderer4, { class: "w-4 h-4 mr-2" });
            $$renderer4.push(`<!----> Cancel`);
          }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          onclick: handleSave,
          disabled: isSaving,
          children: ($$renderer4) => {
            Save($$renderer4, { class: "w-4 h-4 mr-2" });
            $$renderer4.push(`<!----> ${escape_html(isSaving ? "Saving..." : "Save Changes")}`);
          }
        });
        $$renderer3.push(`<!----></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (store_get($$store_subs ??= {}, "$companyQuery", companyQuery).isLoading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-6">`);
        Skeleton($$renderer3, { class: "h-48" });
        $$renderer3.push(`<!----> `);
        Skeleton($$renderer3, { class: "h-64" });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (store_get($$store_subs ??= {}, "$companyQuery", companyQuery).error || !hasCompany) {
          $$renderer3.push("<!--[-->");
          if (isEditing) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="space-y-6">`);
            Card($$renderer3, {
              class: "p-6",
              children: ($$renderer4) => {
                $$renderer4.push(`<div class="flex items-start gap-6"><div class="relative"><div class="w-24 h-24 rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center">`);
                Building_2($$renderer4, { class: "w-12 h-12 text-white" });
                $$renderer4.push(`<!----></div></div> <div class="flex-1 space-y-4"><div>`);
                Label($$renderer4, {
                  for: "company_name",
                  required: true,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Company Name`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "company_name",
                  placeholder: "Enter company name",
                  class: "text-xl font-bold",
                  get value() {
                    return formData.company_name;
                  },
                  set value($$value) {
                    formData.company_name = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div class="grid grid-cols-2 gap-4"><div>`);
                Label($$renderer4, {
                  for: "industry",
                  required: true,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Industry`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "industry",
                  placeholder: "e.g. Technology",
                  get value() {
                    return formData.industry;
                  },
                  set value($$value) {
                    formData.industry = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "size",
                  required: true,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Company Size`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Select($$renderer4, {
                  id: "size",
                  options: companySizeOptions,
                  placeholder: "Select company size",
                  get value() {
                    return formData.size;
                  },
                  set value($$value) {
                    formData.size = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div></div></div></div>`);
              }
            });
            $$renderer3.push(`<!----> <div class="grid lg:grid-cols-2 gap-6">`);
            Card($$renderer3, {
              class: "p-6",
              children: ($$renderer4) => {
                $$renderer4.push(`<h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3> <div class="space-y-4"><div>`);
                Label($$renderer4, {
                  for: "email",
                  required: true,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Email`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "email",
                  type: "email",
                  placeholder: "contact@company.com",
                  get value() {
                    return formData.email;
                  },
                  set value($$value) {
                    formData.email = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "website",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Website`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "website",
                  type: "url",
                  placeholder: "https://...",
                  get value() {
                    return formData.website;
                  },
                  set value($$value) {
                    formData.website = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "phone",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Phone`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "phone",
                  type: "tel",
                  placeholder: "+1 (555) 000-0000",
                  get value() {
                    return formData.phone;
                  },
                  set value($$value) {
                    formData.phone = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div></div>`);
              }
            });
            $$renderer3.push(`<!----> `);
            Card($$renderer3, {
              class: "p-6",
              children: ($$renderer4) => {
                $$renderer4.push(`<h3 class="text-lg font-semibold text-gray-900 mb-4">Address</h3> <div class="space-y-4"><div>`);
                Label($$renderer4, {
                  for: "address",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Street Address`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "address",
                  placeholder: "123 Main Street",
                  get value() {
                    return formData.address;
                  },
                  set value($$value) {
                    formData.address = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div class="grid grid-cols-2 gap-4"><div>`);
                Label($$renderer4, {
                  for: "city",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->City`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "city",
                  placeholder: "San Francisco",
                  get value() {
                    return formData.city;
                  },
                  set value($$value) {
                    formData.city = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "state",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->State`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "state",
                  placeholder: "CA",
                  get value() {
                    return formData.state;
                  },
                  set value($$value) {
                    formData.state = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div></div> <div class="grid grid-cols-2 gap-4"><div>`);
                Label($$renderer4, {
                  for: "country",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Country`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "country",
                  placeholder: "USA",
                  get value() {
                    return formData.country;
                  },
                  set value($$value) {
                    formData.country = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "zip_code",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->ZIP Code`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "zip_code",
                  placeholder: "94102",
                  get value() {
                    return formData.zip_code;
                  },
                  set value($$value) {
                    formData.zip_code = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div></div></div>`);
              }
            });
            $$renderer3.push(`<!----></div></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
            Card($$renderer3, {
              class: "p-8 text-center",
              children: ($$renderer4) => {
                Building_2($$renderer4, { class: "w-12 h-12 mx-auto text-gray-400 mb-4" });
                $$renderer4.push(`<!----> <h3 class="text-lg font-medium text-gray-700 mb-2">No Company Profile</h3> <p class="text-gray-500 mb-4">Create your company profile to get started</p> `);
                Button($$renderer4, {
                  onclick: startEditing,
                  children: ($$renderer5) => {
                    Square_pen($$renderer5, { class: "w-4 h-4 mr-2" });
                    $$renderer5.push(`<!----> Create Company Profile`);
                  }
                });
                $$renderer4.push(`<!---->`);
              }
            });
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[!-->");
          Card($$renderer3, {
            class: "p-6",
            children: ($$renderer4) => {
              $$renderer4.push(`<div class="flex items-start gap-6"><div class="relative"><div class="w-24 h-24 rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center">`);
              Building_2($$renderer4, { class: "w-12 h-12 text-white" });
              $$renderer4.push(`<!----></div> `);
              if (isEditing) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<button class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-royal-600 text-white flex items-center justify-center hover:bg-royal-700 transition-colors">`);
                Upload($$renderer4, { class: "w-4 h-4" });
                $$renderer4.push(`<!----></button>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--></div> <div class="flex-1">`);
              if (isEditing) {
                $$renderer4.push("<!--[-->");
                Input($$renderer4, {
                  placeholder: "Company Name",
                  class: "text-xl font-bold mb-2",
                  get value() {
                    return formData.company_name;
                  },
                  set value($$value) {
                    formData.company_name = $$value;
                    $$settled = false;
                  }
                });
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<h2 class="text-2xl font-bold text-gray-900">${escape_html(company?.company_name || "Company Name")}</h2>`);
              }
              $$renderer4.push(`<!--]--> <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">`);
              if (company?.industry || isEditing) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<span class="flex items-center gap-1">`);
                Building_2($$renderer4, { class: "w-4 h-4" });
                $$renderer4.push(`<!----> ${escape_html(isEditing ? formData.industry || "Industry" : company?.industry || "-")}</span>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (company?.address?.city || company?.address?.country || isEditing) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<span class="flex items-center gap-1">`);
                Map_pin($$renderer4, { class: "w-4 h-4" });
                $$renderer4.push(`<!----> ${escape_html(isEditing ? `${formData.city || "City"}, ${formData.country || "Country"}` : `${company?.address?.city || ""}, ${company?.address?.country || ""}`)}</span>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (company?.size || isEditing) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<span class="flex items-center gap-1">`);
                Users($$renderer4, { class: "w-4 h-4" });
                $$renderer4.push(`<!----> ${escape_html(isEditing ? formData.size || "Size" : company?.size || "-")} employees</span>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--></div></div></div>`);
            }
          });
          $$renderer3.push(`<!----> <div class="grid lg:grid-cols-2 gap-6">`);
          Card($$renderer3, {
            class: "p-6",
            children: ($$renderer4) => {
              $$renderer4.push(`<h3 class="text-lg font-semibold text-gray-900 mb-4">Company Details</h3> `);
              if (isEditing) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="space-y-4"><div>`);
                Label($$renderer4, {
                  for: "industry",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Industry`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "industry",
                  placeholder: "e.g. Technology, Healthcare",
                  get value() {
                    return formData.industry;
                  },
                  set value($$value) {
                    formData.industry = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "size",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Company Size`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Select($$renderer4, {
                  id: "size",
                  options: companySizeOptions,
                  placeholder: "Select company size",
                  get value() {
                    return formData.size;
                  },
                  set value($$value) {
                    formData.size = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<div class="space-y-3"><div class="flex justify-between"><span class="text-gray-500">Industry</span> <span class="text-gray-700">${escape_html(company?.industry || "-")}</span></div> <div class="flex justify-between"><span class="text-gray-500">Company Size</span> <span class="text-gray-700">${escape_html(company?.size || "-")}</span></div></div>`);
              }
              $$renderer4.push(`<!--]-->`);
            }
          });
          $$renderer3.push(`<!----> `);
          Card($$renderer3, {
            class: "p-6",
            children: ($$renderer4) => {
              $$renderer4.push(`<h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3> `);
              if (isEditing) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="space-y-4"><div>`);
                Label($$renderer4, {
                  for: "website",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Website`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "website",
                  type: "url",
                  placeholder: "https://...",
                  get value() {
                    return formData.website;
                  },
                  set value($$value) {
                    formData.website = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "email",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Email`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "email",
                  type: "email",
                  placeholder: "contact@company.com",
                  get value() {
                    return formData.email;
                  },
                  set value($$value) {
                    formData.email = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "phone",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Phone`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "phone",
                  type: "tel",
                  placeholder: "+1 (555) 000-0000",
                  get value() {
                    return formData.phone;
                  },
                  set value($$value) {
                    formData.phone = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<div class="space-y-4">`);
                if (company?.website) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="flex items-center gap-3">`);
                  Globe($$renderer4, { class: "w-5 h-5 text-gray-400" });
                  $$renderer4.push(`<!----> <a${attr("href", company.website)} target="_blank" rel="noopener" class="text-royal-400 hover:underline">${escape_html(company.website)}</a></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                if (company?.email) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="flex items-center gap-3">`);
                  Mail($$renderer4, { class: "w-5 h-5 text-gray-400" });
                  $$renderer4.push(`<!----> <a${attr("href", `mailto:${stringify(company.email)}`)} class="text-gray-600 hover:text-royal-400">${escape_html(company.email)}</a></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                if (company?.phone) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="flex items-center gap-3">`);
                  Phone($$renderer4, { class: "w-5 h-5 text-gray-400" });
                  $$renderer4.push(`<!----> <a${attr("href", `tel:${stringify(company.phone)}`)} class="text-gray-600 hover:text-royal-400">${escape_html(company.phone)}</a></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                if (!company?.website && !company?.email && !company?.phone) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<p class="text-gray-400">No contact information provided.</p>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></div>`);
              }
              $$renderer4.push(`<!--]-->`);
            }
          });
          $$renderer3.push(`<!----> `);
          Card($$renderer3, {
            class: "p-6 lg:col-span-2",
            children: ($$renderer4) => {
              $$renderer4.push(`<h3 class="text-lg font-semibold text-gray-900 mb-4">Address</h3> `);
              if (isEditing) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="grid md:grid-cols-2 gap-4"><div>`);
                Label($$renderer4, {
                  for: "address",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Street Address`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "address",
                  placeholder: "123 Main Street",
                  get value() {
                    return formData.address;
                  },
                  set value($$value) {
                    formData.address = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "city",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->City`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "city",
                  placeholder: "San Francisco",
                  get value() {
                    return formData.city;
                  },
                  set value($$value) {
                    formData.city = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "state",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->State`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "state",
                  placeholder: "CA",
                  get value() {
                    return formData.state;
                  },
                  set value($$value) {
                    formData.state = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "country",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Country`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "country",
                  placeholder: "USA",
                  get value() {
                    return formData.country;
                  },
                  set value($$value) {
                    formData.country = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div> <div>`);
                Label($$renderer4, {
                  for: "zip_code",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->ZIP Code`);
                  }
                });
                $$renderer4.push(`<!----> `);
                Input($$renderer4, {
                  id: "zip_code",
                  placeholder: "94102",
                  get value() {
                    return formData.zip_code;
                  },
                  set value($$value) {
                    formData.zip_code = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!----></div></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<div class="flex items-start gap-3">`);
                Map_pin($$renderer4, { class: "w-5 h-5 text-gray-400 mt-0.5" });
                $$renderer4.push(`<!----> <div class="text-gray-600">`);
                if (company?.address?.street) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<p>${escape_html(company.address.street)}</p>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> <p>${escape_html(company?.address?.city || "")}${escape_html(company?.address?.city && company?.address?.state ? ", " : "")}${escape_html(company?.address?.state || "")}
                ${escape_html(company?.address?.zip_code ? ` ${company.address.zip_code}` : "")}</p> `);
                if (company?.address?.country) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<p>${escape_html(company.address.country)}</p>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                if (!company?.address?.street && !company?.address?.city && !company?.address?.country) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<p class="text-gray-400">No address provided.</p>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></div></div>`);
              }
              $$renderer4.push(`<!--]-->`);
            }
          });
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
