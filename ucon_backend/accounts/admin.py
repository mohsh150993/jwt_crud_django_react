from django.contrib import admin
from accounts.models import CustomUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
    list_display = ('user_pk', 'user_email', 'user_name', 'user_role', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('user_role', 'is_active', 'is_staff', 'is_superuser')

    fieldsets = (
        ('User Credentials', {'fields': ('user_email', 'password')}),
        ('Personal Info', {'fields': ('user_name', 'user_role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('user_email', 'user_name', 'password1', 'password2', 'user_role'),
        }),
    )

    search_fields = ('user_email', 'user_name')
    ordering = ('user_email', 'user_pk')
    filter_horizontal = ()

# Register CustomUser with custom UserModelAdmin
admin.site.register(CustomUser, UserModelAdmin)
