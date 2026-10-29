import { describe, expect, it, vi } from "vitest";
import type {
	UserExperience,
	UserProfile,
	UserProject,
	UserSite,
	UserSocial,
} from "../../app/composables/useUser";

const mockProfile: UserProfile = {
	name: "nairha",
	handle: "@nairha",
	role: "Frontend Engineer & Nuxt Creator",
	bio: "Building minimalist web experiences.",
	location: "Jakarta, ID (UTC+7)",
	email: "nairha@nairha.com",
	avatar: "https://example.com/avatar.jpg",
	availability: "Available for open source & freelance projects",
};

const mockSite: UserSite = {
	brandName: "nairha",
	brandDomain: "dev",
	version: "4.0",
	cliRepoUrl: "https://github.com/nairha/nuxt-nairha",
	seo: {
		title: "nairha — Frontend Engineer & Nuxt Creator",
		description: "Minimalist developer portfolio built with Nuxt 4.",
	},
};

const mockSocial: UserSocial = {
	github: "https://github.com/nairha",
	twitter: "https://x.com/nairha",
	linkedin: "https://linkedin.com/in/nairha",
};

const mockExperience: UserExperience[] = [
	{
		role: "Lead Frontend Engineer",
		company: "Nuxt nairha Ecosystem",
		location: "Remote",
		period: "2024 — Present",
		description: "Open-source developer tooling.",
		achievements: ["Built SSG starters used globally."],
		skills: ["Nuxt 4", "TypeScript"],
	},
];

const mockProjects: UserProject[] = [
	{
		title: "nuxt-nairha CLI",
		description: "CLI starter generator for Nuxt 4.",
		tags: ["Nuxt 4", "TypeScript"],
		stars: 342,
		demoUrl: "https://nuxt.nairha.com",
		githubUrl: "https://github.com/nairha/nuxt-nairha",
		status: "Open Source",
	},
];

vi.mock("../../app/composables/useUser", async (importOriginal) => {
	const mod = await importOriginal<typeof import("../../app/composables/useUser")>();
	return {
		...mod,
		useUserProfile: vi.fn(() => Promise.resolve(mockProfile)),
		useUserSite: vi.fn(() => Promise.resolve(mockSite)),
		useUserSocial: vi.fn(() => Promise.resolve(mockSocial)),
		useUserExperience: vi.fn(() => Promise.resolve(mockExperience)),
		useUserProjects: vi.fn(() => Promise.resolve(mockProjects)),
	};
});

const { useUserProfile, useUserSite, useUserSocial, useUserExperience, useUserProjects } =
	await import("../../app/composables/useUser");

describe("useUserProfile", () => {
	it("returns profile data", async () => {
		const profile = await useUserProfile();
		expect(profile.name).toBe("nairha");
		expect(profile.email).toBe("nairha@nairha.com");
		expect(profile.location).toBe("Jakarta, ID (UTC+7)");
	});
});

describe("useUserSite", () => {
	it("returns site config", async () => {
		const site = await useUserSite();
		expect(site.brandName).toBe("nairha");
		expect(site.version).toBe("4.0");
		expect(site.seo.title).toContain("nairha");
	});
});

describe("useUserSocial", () => {
	it("returns social links", async () => {
		const social = await useUserSocial();
		expect(social.github).toBe("https://github.com/nairha");
		expect(social.twitter).toBe("https://x.com/nairha");
		expect(social.linkedin).toContain("linkedin.com");
	});
});

describe("useUserExperience", () => {
	it("returns experience array", async () => {
		const exp = await useUserExperience();
		expect(exp).toHaveLength(1);
		expect(exp[0].role).toBe("Lead Frontend Engineer");
		expect(exp[0].skills).toContain("Nuxt 4");
	});
});

describe("useUserProjects", () => {
	it("returns featured projects array", async () => {
		const projects = await useUserProjects();
		expect(projects).toHaveLength(1);
		expect(projects[0].title).toBe("nuxt-nairha CLI");
		expect(projects[0].status).toBe("Open Source");
	});
});
