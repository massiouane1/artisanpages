"use client";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { WorkingProject } from "@/components/dashboard/WorkingProject";
import { Profile } from "@/components/profile/Profile";
import { NavigationItemProps } from "@/components/sidebar/types";
import { Sidebar } from "@/components/sidebar/Sidebar";
import React from "react";

export default function Home() {
  const navigationItems: NavigationItemProps[] = [
    { label: "Dashboard", icon: "dashboard" },
    { label: "Projects", icon: "projects" },
    { label: "inbox", icon: "inbox" },
    { label: "Settings", icon: "settings" },
  ];

  return (
    <main>
      <div className="flex justify-between relative">
        <Sidebar className="w-[180px] mr-8" navigationItems={navigationItems} />
        <Dashboard className="flex-1 max-w-[820px]">
          <StatCard 
            icon="/icons/stats.svg" 
            count="25" 
            label="Total Projects" 
            bgColor="bg-blue-100" 
          />
          <ProjectCard 
            image="/images/project-placeholder.jpg"
            category="Development"
            title="Project Title"
            authorImage="/images/avatars/default.jpg"
            authorName="John Doe"
            authorRole="Developer"
          />
          <WorkingProject 
            authorImage="/images/avatars/default.jpg"
            authorName="John Doe"
            date="2024-01-16"
            jobType="Full-time"
            jobTitle="Software Engineer"
          />
        </Dashboard>
        <Profile className="w-[250px] ml-8" />
      </div>
    </main>
  );
}
