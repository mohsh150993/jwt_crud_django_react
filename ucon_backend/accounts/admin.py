from django.contrib import admin
from accounts.models import CustomUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
    list_display = ('id', 'user_email', 'user_name', 'user_role', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('user_role', 'is_active', 'is_staff', 'is_superuser')

    fieldsets = (
        ('User Credentials', {'fields': ('user_email', 'password')}),
        ('Personal Info', {'fields': ('user_name', 'user_role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('user_email', 'user_name', 'user_role', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )

    search_fields = ('user_email', 'user_name')
    ordering = ('user_email', 'id')
    filter_horizontal = ('groups', 'user_permissions')

admin.site.register(CustomUser, UserModelAdmin)
