const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const categoryService = {
  async getAll() {
    try {
      const params = {
"fields": [
{
"field": {
"Name": "Id"
}
},
{
"field": {
"Name": "Name"
}
},
{
"field": {
"Name": "Tags"
}
},
{
"field": {
"Name": "color_c"
}
},
{
"field": {
"Name": "task_count_c"
}
},
{
"field": {
"Name": "order_c"
}
}
]
      };
      
const response = await apperClient.fetchRecords('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const params = {
fields: [
{
"field": {
"Name": "Id"
}
},
{
"field": {
"Name": "Name"
}
},
{
"field": {
"Name": "Tags"
}
},
{
"field": {
"Name": "color_c"
}
},
{
"field": {
"Name": "task_count_c"
}
},
{
"field": {
"Name": "order_c"
}
}
]
      };
      
const response = await apperClient.getRecordById('category_c', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      throw error;
    }
  },

  async create(categoryData) {
try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [
          {
            // Only include Updateable fields for create operation
            Name: categoryData.name || categoryData.Name,
            Tags: categoryData.tags || categoryData.Tags || '',
            color_c: categoryData.color || categoryData.color_c || '#5B4EE5',
            task_count_c: categoryData.task_count || categoryData.taskCount || categoryData.task_count_c || 0,
            order_c: categoryData.order !== undefined ? categoryData.order : (categoryData.order_c !== undefined ? categoryData.order_c : 0)
          }
        ]
      };
      
const response = await apperClient.createRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create category');
        }
        
        return successfulRecords[0].data;
      }
      
      throw new Error('Unexpected response format');
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const params = {
        records: [
          {
Id: parseInt(id),
            // Only include Updateable fields for update operation
            ...(updateData.name !== undefined && { Name: updateData.name }),
            ...(updateData.Name !== undefined && { Name: updateData.Name }),
            ...(updateData.tags !== undefined && { Tags: updateData.tags }),
            ...(updateData.Tags !== undefined && { Tags: updateData.Tags }),
            ...(updateData.color !== undefined && { color_c: updateData.color }),
            ...(updateData.color_c !== undefined && { color_c: updateData.color_c }),
            ...(updateData.task_count !== undefined && { task_count_c: updateData.task_count }),
            ...(updateData.taskCount !== undefined && { task_count_c: updateData.taskCount }),
            ...(updateData.task_count_c !== undefined && { task_count_c: updateData.task_count_c }),
            ...(updateData.order !== undefined && { order_c: updateData.order }),
            ...(updateData.order_c !== undefined && { order_c: updateData.order_c })
          }
        ]
      };
      
const response = await apperClient.updateRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || 'Failed to update category');
        }
        
        return successfulUpdates[0].data;
      }
      
      throw new Error('Unexpected response format');
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
const response = await apperClient.deleteRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || 'Failed to delete category');
        }
        
        return true;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },

  async updateTaskCount(categoryId, count) {
    try {
      return await this.update(categoryId, { task_count: count });
    } catch (error) {
      console.error("Error updating task count:", error);
      throw error;
    }
  }
};

export default categoryService;