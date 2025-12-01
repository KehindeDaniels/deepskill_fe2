// __tests__/components/modules/ModuleCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModuleCard from "@/components/modules/ModuleCard";

// Mock next/image to behave like a simple img tag
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock next/link to just render an <a> with href
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe("ModuleCard", () => {
  const OLD_ENV = process.env;

  beforeAll(() => {
    process.env = {
      ...OLD_ENV,
      NEXT_PUBLIC_STRAPI_URL: "http://localhost:1337",
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const baseModule = {
    slug: "react-basics",
    title: "React Basics",
    shortDescription: "Learn the fundamentals of React.",
    duration: 90,
    avgRating: 4.5,
    thumbnail: [
      {
        url: "/uploads/react_basics.jpg",
        formats: {
          medium: {
            url: "/uploads/medium_react_basics.jpg",
          },
        },
      },
    ],
  };

  it("renders module title, description, duration and rating", () => {
    render(<ModuleCard module={baseModule} />);

    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(
      screen.getByText("Learn the fundamentals of React.")
    ).toBeInTheDocument();
    expect(screen.getByText(/90 min/)).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("links to the correct module slug URL", () => {
    render(<ModuleCard module={baseModule} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/modules/react-basics");
  });

  it("builds full image URL using NEXT_PUBLIC_STRAPI_URL and medium format", () => {
    render(<ModuleCard module={baseModule} />);

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toBe(
      "http://localhost:1337/uploads/medium_react_basics.jpg"
    );
    expect(img.alt).toBe("React Basics");
  });

  it("falls back to rating 4.8 when no avgRating is provided", () => {
    const moduleWithoutRating = {
      ...baseModule,
      avgRating: null,
    };

    render(<ModuleCard module={moduleWithoutRating} />);

    // In your component: {module.avgRating || "4.8"}
    expect(screen.getByText("4.8")).toBeInTheDocument();
  });

  it("falls back to placeholder image when no thumbnail is provided", () => {
    const moduleWithoutThumb = {
      ...baseModule,
      thumbnail: [],
    };

    render(<ModuleCard module={moduleWithoutThumb} />);

    const img = screen.getByRole("img") as HTMLImageElement;
    // Component uses "/placeholder.jpg" then prefixes STRAPI_URL
    expect(img.src).toBe("http://localhost:1337/placeholder.jpg");
  });
});
