import { type SchemaTypeDefinition } from 'sanity'

// Banner schema
const banner: SchemaTypeDefinition = {
  name: 'banner',
  title: 'Banners',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}

// Pricing Category schema (formerly Menu Category)
const pricingCategory: SchemaTypeDefinition = {
  name: 'pricingCategory',
  title: 'Pricing Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
}

// Pricing Item schema (formerly Menu)
const pricingItem: SchemaTypeDefinition = {
  name: 'pricingItem',
  title: 'Pricing Items',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'pricingCategory' }],
      validation: (Rule) => Rule.required(),
    },
  ],
}

// Package schema
const packageSchema: SchemaTypeDefinition = {
  name: 'package',
  title: 'Packages',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'image',
      title: 'Package Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Featured Package',
      type: 'boolean',
      description: 'Display this package prominently on the homepage',
      initialValue: false,
    },
    {
      name: 'services',
      title: 'Included Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'pricingItem' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
}

// Testimonial schema
const testimonial: SchemaTypeDefinition = {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subDescription',
      title: 'Subtitle/Role',
      type: 'string',
      description: 'E.g., "Regular Customer", "Bride"',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      description: 'Rating out of 5',
    },
  ],
}

// Recent Work schema
const recentWork: SchemaTypeDefinition = {
  name: 'recentWork',
  title: 'Recent Work',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Work Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}

// Newsletter schema
const newsletter: SchemaTypeDefinition = {
  name: 'newsletter',
  title: 'Newsletter Subscriptions',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt',
    },
  },
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [banner, pricingCategory, pricingItem, packageSchema, testimonial, recentWork, newsletter],
}
