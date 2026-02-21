import React from "react";
// Icons
import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";
import ComputerIcon from "@mui/icons-material/Computer";
import GitHubIcon from "@mui/icons-material/GitHub";
import AdbIcon from "@mui/icons-material/Adb";
import PrecisionIcon from "@mui/icons-material/PrecisionManufacturing";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ConstructionIcon from "@mui/icons-material/Construction";
import StorageIcon from "@mui/icons-material/Storage";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";

export const COURSE_DATA = {
    devops: {
        title: "DevOps",
        link: "/courses/devops",
        desc: "CI/CD, containers & infra automation",
        items: [
            { name: "Git", link: "/courses/devops/git", icon: <GitHubIcon /> },
            { name: "Docker", link: "/courses/devops/docker", icon: <AdbIcon /> },
            { name: "Jenkins", link: "/courses/devops/jenkins", icon: <PrecisionIcon /> },
            { name: "Kubernetes", link: "/courses/devops/kubernetes", icon: <CloudQueueIcon /> },
            { name: "Terraform", link: "/courses/devops/terraform", icon: <ConstructionIcon /> },
            { name: "Prometheus", link: "/courses/devops/prometheus", icon: <StorageIcon /> },
            { name: "Grafana", link: "/courses/devops/grafana", icon: <LayersIcon /> },
            { name: "Ansible", link: "/courses/devops/ansible", icon: <BuildIcon /> },
        ],
    },

    aws: {
        title: "AWS",
        link: "/courses/aws",
        desc: "Core AWS services",
        items: [
            { name: "EC2", link: "/courses/aws/ec2", icon: <StorageIcon /> },
            { name: "S3", link: "/courses/aws/s3", icon: <StorageIcon /> },
            { name: "IAM", link: "/courses/aws/iam", icon: <CodeIcon /> },
            { name: "Lambda", link: "/courses/aws/lambda", icon: <CodeIcon /> },
            { name: "VPC", link: "/courses/aws/vpc", icon: <CloudIcon /> },
            { name: "RDS", link: "/courses/aws/rds", icon: <StorageIcon /> },
            { name: "Route53", link: "/courses/aws/route53", icon: <CloudIcon /> },
            { name: "Auto Scaling", link: "/courses/aws/auto-scaling", icon: <CloudIcon /> },
            { name: "SQS", link: "/courses/aws/sqs", icon: <StorageIcon /> },
            { name: "SNS", link: "/courses/aws/sns", icon: <CloudIcon /> },
        ],
    },

    Script: {
        title: "SCRIPT",
        link: "/courses/script",
        desc: "Core Script services",
        items: [
            { name: "DOCKERFILE", link: "/courses/script/dockerfile", icon: <StorageIcon /> },
            { name: "YAML", link: "/courses/script/yaml", icon: <StorageIcon /> },
            { name: "GROOVE", link: "/courses/script/groove", icon: <CodeIcon /> },
        ],
    },

    os: {
        title: "OS",
        link: "/courses/os",
        desc: "Operating systems & scripting",
        items: [
            { name: "Linux Basics", link: "/courses/os/linux-basics", icon: <CodeIcon /> },
            { name: "Ubuntu", link: "/courses/os/ubuntu", icon: <CodeIcon /> },
            { name: "CentOS", link: "/courses/os/centos", icon: <CodeIcon /> },
            { name: "Red Hat", link: "/courses/os/redhat", icon: <CodeIcon /> },
            { name: "Windows Shell", link: "/courses/os/windows-shell-script", icon: <CodeIcon /> },
            { name: "Ubuntu Shell", link: "/courses/os/ubuntu-shell-script", icon: <CodeIcon /> },
        ],
    },
};

export const RESUME_MENU = {
    title: "Resume",
    desc: "Build your professional resume",
    items: [
        { name: "Templates", link: "/resume/templates", icon: <DescriptionIcon /> },
        { name: "Build Resume", link: "/resume/builder", icon: <DescriptionIcon /> },
        { name: "My Resumes", link: "/resume", icon: <DescriptionIcon /> },
    ],
};
